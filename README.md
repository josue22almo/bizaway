# Bizaway

Welcome to the Bizaway project! This project is structured using the Nx workspace, which provides a powerful set of tools for managing and scaling your codebase. For more information about Nx, visit the [Nx website](https://nx.dev).

## Setup

To get started with the Bizaway project, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd bizaway
   ```

2. **Install dependencies:**
   Make sure you have Node.js and npm installed. Then run:
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Modify the `.env.local` file in the root directory with the necessary environment variables.

   Don't commit the `.env.local` file to the repository.

4. **Run tests:**
   To run tests, use the following command:
   ```sh
   npm run test:unit -- --verbose
   npm run test:integration -- --verbose
   ```

5. **Run the project:**
   To run the project locally, use:
   ```sh
   npx nx serve nest-api
   ```

   Application is running on: http://localhost:3000
   Swagger documentation is available at: http://localhost:3000/api


## Testing

The project uses Jest for unit testing and integration testing.

To run the tests, use the following command:
```sh
npm run test:unit
npm run test:integration
```

## Project structure

The project uses the following structure:

- **apps/nest-api**: Contains the NestJS application where the API is implemented.
- **libs/contexts**: Contains the context implementations. Currently there is only one context: Trips. It could be extended to other contexts in the future.



## Architecture

The project uses an hexagonal architecture with the following layers:

- **Domain**: Contains the business logic and entities.
- **Application**: Contains the services to interact with the domain.
- **Infrastructure**: Contains the repositories and external services.

The project uses NestJS to build the API.

With an hexagonal architecture, the API could be easily implemented in other frameworks like express, fastify, etc.

To do that, we would need to create a new folder in the apps folder and implement the API in it using the services from the contexts.

Those services have an abstract dependency on `TripsRepository`.

```typescript
export abstract class TripsRepository {
  abstract byQuery(
    origin: IATA3,
    destination: IATA3,
    sortStrategy: SortStrategy
  ): Promise<Trip[]>;
  abstract all(): Promise<Trip[]>;
  abstract save(trip: Trip): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
```

Currently, there is only one implementation of TripsRepository: `MergedTripsRepository`.

```typescript
export class MergedTripsRepository implements TripsRepository {
  private trips: Trip[] = []; // stores the trips in memory
  private bizAwayApi: BizAwayApi;

  byQuery -> uses the BizAwayApi to get the trips
  all -> returns the trips stored in memory
  save -> saves the trip in memory
  delete -> deletes the trip from memory
}
```

All the classes has been decoupled to increase cohesion and facilitate the testing.

Furthermore, the `MergedTripsRepository` has a dependency on the `BizAwayApi` to get the trips.

### Design Patterns

- [Visitor pattern](https://refactoring.guru/design-patterns/visitor): used to avoid exposing private data of the trip to the outside world. For instance, this is good for encapsulation and it would be easier if we want to extend the Trip class with new properties or implement new views like a different DTOs or database models.

With this pattern, we are avoiding [Inappropriate intimacy smell code](https://refactoring.guru/es/smells/inappropriate-intimacy)

```typescript
class TripDto implements TripVisitor {
  id: string;
  // ...
  constructor(trip: Trip) {
    trip.accept(this);
  }
  setId(id: string): void {
    this.id = id;
  }
  // ...
}

class TripMongoDatabaseModel implements TripVisitor {
  id: ObjectId;
  // ...
  constructor(trip: Trip) {
    trip.accept(this);
  }

  setId(id: string): void {
    this.id = new ObjectId(id);
  }
  // ...
}

const tripDto = new TripDto(trip);
const tripMongoDatabaseModel = new TripMongoDatabaseModel(trip);

tripMongoDatabaseModel.id // is ObjectId
tripDto.id // is string
```

- [Strategy pattern](https://refactoring.guru/design-patterns/strategy): used to sort the trips by different strategies. This is useful to avoid modifying the `TripsRepository` class to add new sorting strategies. (aka Open/Closed Principle)

- [Factory pattern](https://refactoring.guru/design-patterns/factory): used to choose the correct implementation of the SortStrategy. Also useful to Open/Closed Principle.

Merging the factory and strategy patterns, we can create a factory that returns the correct implementation of the SortStrategy.


```typescript
interface SortStrategy {
  sort(trips: Trip[]): Trip[];
}

class SortByCost implements SortStrategy {
  sort(trips: Trip[]): Trip[] {
    return trips.sort((a, b) => a.cost - b.cost);
  }
}

class SortStrategyFactory {
  static create(sortBy: SortBy): SortStrategy {
    switch (sortBy) {
      case SortBy.CHEAPEST:
        return new SortByCost();
      case SortBy.FASTEST:
        return new SortByDuration();
    }
  }
}

const trips = await tripsRepository.byQuery(origin, destination, SortStrategyFactory.create(sortBy));
```

If we want to add a new sorting strategy, we can do it without modifying the existing code. We just need to implement the new strategy and add it to the factory, like follows:

```typescript
class SortByMostRecommended implements SortStrategy {
  sort(trips: Trip[]): Trip[] {
    return trips.sort((a, b) => a.duration - b.duration);
  }
}

class SortStrategyFactory {
  static create(sortBy: SortBy): SortStrategy {
    switch (sortBy) {
      ...
      case SortBy.MOST_RECOMMENDED:
        return new SortByRecommended();
    }
  }
}

// keeps the same code
const trips = await tripsRepository.byQuery(origin, destination, SortStrategyFactory.create(sortBy));
```
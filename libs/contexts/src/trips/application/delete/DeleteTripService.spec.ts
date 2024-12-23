import { DeleteTripService } from './DeleteTripService';
import { TripsRepository } from '../../domain';

describe('DeleteTripService', () => {
  let service: DeleteTripService;
  let mockRepository: jest.Mocked<TripsRepository>;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      delete: jest.fn(),
      byQuery: jest.fn(),
      all: jest.fn(),
    };

    service = new DeleteTripService(mockRepository);
  });

  describe('delete', () => {
    it('should delete a trip with the given id', async () => {
      const tripId = '1234';
      mockRepository.delete.mockResolvedValueOnce();

      await service.delete(tripId);

      expect(mockRepository.delete).toHaveBeenCalledWith(tripId);
    });

    it('should propagate repository errors', async () => {
      const tripId = '1234';
      const error = new Error('Delete failed');
      mockRepository.delete.mockRejectedValueOnce(error);

      await expect(service.delete(tripId)).rejects.toThrow('Delete failed');
    });
  });
}); 
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { doProcessing } from '../../../api/apiCall';

import { usePhotoGallery } from '../../components/usePhotoGallery';

jest.mock('@capacitor/camera');
jest.mock('../../api/apiCall');

describe('usePhotoGallery', () => {
  it('should expose a function', () => {
		expect(usePhotoGallery).toBeDefined();
	});
  
});
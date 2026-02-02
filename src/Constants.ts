import type {IContactForm} from './types';

export const noImage = 'https://artscimedia.case.edu/wp-content/uploads/sites/79/2016/12/14205134/no-user-image.gif';

export const EMPTY_VALUES: IContactForm = {
     name: '',
     phone: '',
     email: '',
     photo: '',
 };

export const MODAL_STYLES = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
import present from '../../assets/days/present.svg';
import Leave from '../../assets/days/leave.svg';
import weekoff from '../../assets/days/weekoff.svg';
import absent from '../../assets/days/absent.svg';
import compoff from '../../assets/days/compoff.svg';
import leaveimage from '../../assets/days/leave-background.svg';

export const generateAttendanceElement = (value, imageValue) => {
  let image, backgroundImage;

  switch (value) {
    case 'PRESENT':
      image = present;
      break;
    case 'LEAVE':
      image = Leave;
      if (imageValue?.image !== 1) {
        backgroundImage = leaveimage;
      }
      break;
    case 'WEEK_OFF':
      image = weekoff;
      break;
    case 'ABSENT':
      image = absent;
      if (imageValue?.image !== 1) {
        backgroundImage = leaveimage;
      }
      break;
    case 'COMP_OFF':
      image = compoff;
      break;
    default:
     
  }

  return { image, backgroundImage };
};

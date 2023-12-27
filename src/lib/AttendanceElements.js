import present from '../../assets/days/present.png';
import Leave from '../../assets/days/leave.png';
import weekoff from '../../assets/days/weekoff.png';
import absent from '../../assets/days/absent.png';
import compoff from '../../assets/days/compoff.png';
import notAssigned from "../../assets/days/notassigned.png"


export const generateAttendanceElement = (value) => {
  let image, backgroundImage;

  switch (value) {
    case 2:
      image = present;
      break;
    case 3:
      image = Leave;
      break;
    case 5:
      image = weekoff;
      break;
    case '0':
      image = absent;
      break;
    case 4:
      image = compoff;
      break;
    case 1:
      image = notAssigned;
      break;
    default:

  }

  return image;
};

export const attendanceId = (value) => {
  let Id;

  switch (value) {
    case 'Absent':
      Id = '0';
      break;
    case 'Present':
      Id = 2;
      break;
    case 'Leave':
      Id = 3;
      break;
    case 'Comp Off':
      Id = 4;
      break;
    case 'Week Off':
      Id = 5;
      break;
    default:

  }

  return Id;
};
export const attendanceName = (value) => {
  let Id;

  switch (value) {
    case '0':
      Id = 'Absent';
      break;
    case '2':
      Id = 'Present';
      break;
    case '3':
      Id = 'Leave';
      break;
    case '4':
      Id = 'Comp Off';
      break;
    case '5':
      Id = 'Week Off';
      break;
    default:

  }

  return Id;
};
export const AttendanceChangeRequestReasonChoices = (value) => {
  let Id

  switch (value) {
    case 'Forgot to Punch':
      Id = '0';
      break;
    case 'Out for Work':
      Id = 2;
      break;
    case 'Others':
      Id = 3;
      break;
    default:

  }
  return Id;
}

export const ReverseAttendanceChangeRequestReasonChoices = (id) => {
  let reason;

  switch (id) {
    case '0':
      reason = 'Forgot to Punch';
      break;
    case 2:
      reason = 'Out for Work';
      break;
    case 3:
      reason = 'Others';
      break;
    default:
    // Handle default case if needed
  }

  return reason;
}
export const getAttendanceStatusById = (id) => {

  let status;

  switch (id) {
    case '0':
      status = 'PENDING';
      break;
    case 2:
      status = 'APPROVED';
      break;
    case 3:
      status = 'REJECTED';
      break;
    case 4:
      status = 'DELETED';
      break;
    default:
    // Handle default case if needed
  }

  return status;

}


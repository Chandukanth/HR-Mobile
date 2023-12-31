import { API_URL } from "../../config";

const appApi = (path) => {

    return `${API_URL}/${path}`;

};

// API call routes
export const endpoints = () => ({
    AttendanceAPI: appApi("hr_attendance/"),
    CompanyApi: appApi("company/"),
    ColorApi: appApi("color/"),
    BranchApi: appApi("branch/"),
    LoggedInUserApi: appApi("company_user"),
    UserApi: appApi("user"),
    CompanyDepartmentApi: appApi("company_department/"),
    CompanyDesignationApi: appApi("company_designation/"),
    CompanyRoleApi: appApi("company_role/"),
    CompanyUserApi: appApi("company_user/"),
    HrUserProfileApi: appApi("hr_user_profile/"),
    HrShiftApi: appApi("hr_shift/"),
    HrShiftChangeRequestApi: appApi("hr_shift_change_request/"),
    HrRosterApi: appApi("hr_roster/"),
    HrAttendanceChangeRequestApi: appApi("hr_attendance_change_request/"),
    HrLeaveTypeApi: appApi("hr_leave_type/"),
    HrLeaveRequestApi: appApi("hr_leave_request/"),
    HrCheckInApi: appApi("hr_check_in/"),
    payrollReimbursementCategory: appApi("payroll_reimbursement_category/"),
    HrTeamAPi : appApi("hr_team/")

});
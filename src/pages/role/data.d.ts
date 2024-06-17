export interface RoleListParam {
    current: number;
    pageSize?: number;
    role_name?: string;
    status_id?: number;
}

export interface RoleVo {
    create_time: string;
    id: number;
    remark: string;
    role_name: string;
    sort: number;
    status_id: number;
    update_time: string;
}

export interface RoleListSearch{
    role_name?: string;
    status_id?: number;
}

export const defaultRoleVo: RoleVo = {
    create_time: '',
    id: 0,
    remark: '',
    role_name: '',
    sort: 0,
    status_id: 0,
    update_time: '',
}
import React from "react";

export interface UserListParam {
    current: number;
    pageSize?: number;
    mobile?: string;
    status_id?: number;
}

export interface UserVo {
    create_time: string;
    id: number;
    mobile: string;
    user_name: string;
    remark: string;
    sort: number;
    status_id: number;
    update_time: string;
}

export interface UserListSearch {
    mobile?: string;
    status_id?: number;
}

import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { Modal, Table, Tag } from 'antd'
import { UserVo } from '../data'
import { ColumnsType } from 'antd/es/table'
import { RoleVo } from '../../role/data'
import { query_user_role } from '../service'

interface UpdateUserFormProps {
  open: boolean
  onCreate: (user_id: number, role_ids: number[]) => void
  onCancel: () => void
  userVo: UserVo
}

const columns: ColumnsType<RoleVo> = [
  {
    title: t('名称'),
    dataIndex: 'role_name',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: t('排序'),
    dataIndex: 'sort',
  },
  {
    title: t('状态'),
    dataIndex: 'status_id',
    render: (_, { status_id }) => (
      <>
        {
          <Tag
            color={status_id === 0 ? '#ff4d4f' : '#67c23a'}
            style={{
              width: 50,
              height: 30,
              textAlign: 'center',
              paddingTop: 4,
            }}
          >
            {status_id === 0 ? t('禁用') : t('启用')}
          </Tag>
        }
      </>
    ),
  },
  {
    title: t('备注'),
    dataIndex: 'remark',
  },
  {
    title: t('创建时间'),
    dataIndex: 'create_time',
  },
  {
    title: t('更新时间'),
    dataIndex: 'update_time',
  },
]

const SetUserRoleForm: React.FC<UpdateUserFormProps> = ({
  open,
  onCreate,
  onCancel,
  userVo,
}) => {
  const [roleList, setRoleList] = useState<RoleVo[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  useEffect(() => {
    if (open) {
      setRoleList([])
      setSelectedRowKeys([])
      query_user_role(userVo.id).then((res) => {
        console.log(res)
        setRoleList(res.data.sys_role_list)

        if (res.data.user_role_ids) {
          setSelectedRowKeys(res.data.user_role_ids)
        }
      })
    }
  }, [open])

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      setSelectedRowKeys(newSelectedRowKeys)
    },
  }

  const handleOk = () => {
    onCreate(
      userVo.id,
      selectedRowKeys.map((i) => Number(i))
    )
  }

  const modalFooter = {
    title: t('更新'),
    okText: t('保存'),
    onOk: handleOk,
    onCancel,
    cancelText: t('取消'),
    open,
    width: 800,
  }

  return (
    <Modal {...modalFooter} style={{ top: 150 }}>
      <Table
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={roleList}
      />
    </Modal>
  )
}

export default SetUserRoleForm

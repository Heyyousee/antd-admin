import { t } from 'i18next'
import React, { useState } from 'react'
import {
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Radio,
  RadioChangeEvent,
  TreeSelect,
} from 'antd'
import { MenuVo } from '../data'
import TextArea from 'antd/es/input/TextArea'

interface CreateMenuFormProps {
  open: boolean
  onCreate: (values: MenuVo) => void
  onCancel: () => void
  menuListData: MenuVo[]
}

const CreateMenuForm: React.FC<CreateMenuFormProps> = ({
  open,
  onCreate,
  onCancel,
  menuListData,
}) => {
  const [menuType, setMenuType] = useState<number>(2)
  const [menuName, setMenuName] = useState<string>(t('菜单名称'))

  const [form] = Form.useForm()
  const FormItem = Form.Item

  // useEffect(() => {
  //     if (open) {
  //         setRoleList([]);
  //         setSelectedRowKeys([]);
  //         query_user_role(userVo.id).then((res) => {
  //             console.log(res);
  //             setRoleList(res.data.sys_role_list);
  //
  //             if (res.data.user_role_ids) {
  //                 setSelectedRowKeys(res.data.user_role_ids)
  //             }
  //         });
  //     }
  // }, [open]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onCreate({ api_url: '', menu_url: '', icon: '', ...values })
        form.resetFields()
      })
      .catch((info) => {
        message.error(info)
      })
  }

  const onChange = (e: RadioChangeEvent) => {
    let t = e.target.value
    setMenuType(t)
    if (t === 1) {
      setMenuName(t('目录名称'))
    } else {
      setMenuName(t === 2 ? t('菜单名称') : t('按钮名称'))
    }
  }

  const userFormContent = () => {
    return (
      <>
        <FormItem label={t('类型')} name="menu_type">
          <Radio.Group onChange={onChange}>
            <Radio value={1}>{t('目录')}</Radio>
            <Radio value={2}>{t('菜单')}</Radio>
            <Radio value={3}>{t('按钮')}</Radio>
          </Radio.Group>
        </FormItem>
        {menuType !== 1 && (
          <FormItem label={t('上级')} name="parent_id">
            <TreeSelect
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={menuListData}
              placeholder={t('请选择上级')}
              fieldNames={{
                label: 'menu_name',
                value: 'id',
                children: 'children',
              }}
              allowClear
            />
          </FormItem>
        )}

        <FormItem
          label={menuName}
          name="menu_name"
          rules={[{ required: true, message: t('请输入菜单名称!') }]}
        >
          <Input />
        </FormItem>
        {menuType !== 3 && (
          <FormItem
            label={t('路径')}
            name="menu_url"
            rules={[{ required: true, message: t('请输入路径!') }]}
          >
            <Input />
          </FormItem>
        )}

        {menuType === 3 && (
          <FormItem
            label={t('接口地址')}
            name="api_url"
            rules={[{ required: true, message: t('请输入接口地址!') }]}
          >
            <Input />
          </FormItem>
        )}

        <FormItem
          label={t('排序')}
          name="sort"
          rules={[{ required: true, message: t('请输入排序!') }]}
        >
          <InputNumber />
        </FormItem>
        {menuType !== 3 && (
          <FormItem
            label={t('图标')}
            name="icon"
            rules={[{ required: true, message: t('请输入图标!') }]}
          >
            <Input />
          </FormItem>
        )}

        <FormItem
          label={t('状态')}
          name="status_id"
          rules={[{ required: true, message: t('请输入状态!') }]}
        >
          <Radio.Group>
            <Radio value={1}>{t('启用')}</Radio>
            <Radio value={0}>{t('禁用')}</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem label={t('备注')} name="remark" initialValue={''}>
          <TextArea rows={2} />
        </FormItem>
      </>
    )
  }

  const modalFooter = {
    title: t('新建'),
    okText: t('保存'),
    onOk: handleOk,
    onCancel,
    cancelText: t('取消'),
    open,
    width: 480,
  }
  const formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
    form,
    initialValues: { sort: 1, status_id: 1, menu_type: 2, icon: 'Setting' },
  }

  return (
    <Modal {...modalFooter} style={{ top: 150 }}>
      <Form {...formLayout} style={{ marginTop: 30 }}>
        {userFormContent()}
      </Form>
    </Modal>
  )
}

export default CreateMenuForm

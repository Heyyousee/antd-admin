import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import { Form, Input, InputNumber, Modal, Radio, Select } from 'antd'
import { MenuVo } from '../data'
import TextArea from 'antd/es/input/TextArea'
import { IconMaps } from '@/pages/admin/icons'

interface UpdateMenuFormProps {
  open: boolean
  onCreate: (values: MenuVo) => void
  onCancel: () => void
  menuVo?: MenuVo
}

const UpdateMenuForm: React.FC<UpdateMenuFormProps> = ({
  open,
  onCreate,
  onCancel,
  menuVo,
}) => {
  const [menuType, setMenuType] = useState<number>(2)
  const [menuName, setMenuName] = useState<string>(t('名称'))

  const [form] = Form.useForm()
  const FormItem = Form.Item

  useEffect(() => {
    if (menuVo) {
      form.setFieldsValue(menuVo)

      let v = menuVo.menu_type
      setMenuType(v)
      setMenuName(t('名称'))
      
    }
  }, [menuVo])

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        // form.resetFields();
        onCreate({ api_url: '', menu_url: '', icon: '', ...values })
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
  }

  const userFormContent = () => {
    return (
      <>
        <FormItem label="id" name="id" hidden={true}>
          <Input />
        </FormItem>
        <FormItem label="parent_id" name="parent_id" hidden={true}>
          <Input />
        </FormItem>
        <FormItem label={t('类型')} name="menu_type">
          <Radio.Group disabled>
            <Radio value={1}>{t('目录')}</Radio>
            <Radio value={2}>{t('菜单')}</Radio>
            <Radio value={3}>{t('按钮')}</Radio>
          </Radio.Group>
        </FormItem>
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

        {menuType !== 1 && (
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
            // rules={[{ required: true, message: t('请输入图标!') }]}
          >
            {/* <Input /> */}
            <Select
              style={{ width: '100%' }}
            >
              {Object.keys(IconMaps).map(icon => (
                <Select.Option key={icon} value={icon}>{IconMaps[icon]} {icon}</Select.Option>
              ))}
          </Select>
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
        <FormItem label={t('备注')} name="remark">
          <TextArea rows={2} />
        </FormItem>
      </>
    )
  }

  const modalFooter = {
    title: t('更新'),
    okText: t('保存'),
    onOk: handleOk,
    onCancel,
    cancelText: t('取消'),
    open,
    width: 480,
  }
  const formLayout = { labelCol: { span: 7 }, wrapperCol: { span: 13 }, form }

  return (
    <Modal {...modalFooter} style={{ top: 150 }}>
      <Form {...formLayout} style={{ marginTop: 30 }}>
        {userFormContent()}
      </Form>
    </Modal>
  )
}

export default UpdateMenuForm

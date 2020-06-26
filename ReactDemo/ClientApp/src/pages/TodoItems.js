import React, { Component } from 'react';
import {
    Button, Space, Typography, Spin,
    Form, Input, Checkbox, List, Card, Modal
} from 'antd';
import {
    EditOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined
} from '@ant-design/icons';

const baseUri = 'api/TodoItems';

export class TodoItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loading: true,
            selected: null
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    getDateTimeString = dateString => {
        const dateTime = new Date(dateString);

        return `${dateTime.toLocaleDateString()} at ${dateTime.toLocaleTimeString()}`;
    }

    renderCompleteIcon = item => {
        if (item.isComplete) {
            return (
                <CloseCircleOutlined
                    key="complete"
                    onClick={() => this.onItemChecked(item)}
                />
            )
        }

        return (
            <CheckCircleOutlined
                key="complete"
                onClick={() => this.onItemChecked(item)}
            />
        );
    }

    onEdit = item => {
        this.setState({
            selected: item
        });
    }

    renderList = () => {
        return (
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 3,
                    xl: 4,
                    xxl: 4,
                }}
                dataSource={this.state.items}
                renderItem={item => (
                    <List.Item>
                        <Card
                            size="small"
                            actions={[
                                <EditOutlined key="edit" onClick={() => this.onEdit(item)} />,
                                this.renderCompleteIcon(item)
                            ]}>
                            <span className={item.isComplete ? 'complete' : ''}>{item.name}</span>
                        </Card>
                    </List.Item>
                )}
            />
        )
    }

    onFinish = values => {
        const todoItem = {
            name: values.name,
            isComplete: false
        };

        this.createTodoItem(todoItem);
    }

    createTodoItem = async todoItemDto => {
        try {
            const result = await fetch(baseUri, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todoItemDto)
            });

            this.fetchData();
        } catch (err) {
            console.error('error creating todo', err);
        }
    }

    onItemChecked = async item => {
        const todoItem = {
            ...item,
            isComplete: !item.isComplete
        };
        this.updateTodo(todoItem);
    }

    updateTodo = async item => {
        try {
            const result = await fetch(`${baseUri}/${item.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            });

            this.fetchData();
        } catch (err) {
            console.error('error creating todo', err);
        }
    }

    renderAddTodoForm = () => {
        return (
            <Form
                name="basic"
                layout="inline"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Todo
                    </Button>
                </Form.Item>
            </Form>
        );
    }

    renderModal = () => {
        let formRef;
        const selectedItem = this.state.selected;
        const name = selectedItem ? selectedItem.name : '';

        return (
            <Modal
                title="Edit Todo Item"
                visible={selectedItem != null}
                onOk={() => {
                    const values = formRef.getFieldsValue(['name']);
                    const todoItem = {
                        ...selectedItem,
                        ...values
                    };
                    console.log(formRef);

                    this.setState({ selected: null });
                    this.updateTodo(todoItem);
                }}
                destroyOnClose={true}
                onCancel={() => {
                   
                    this.setState({ selected: null });
                }}>
                <Form
                    ref={el => formRef = el}
                    name="basic"
                    layout="horizontal"
                    initialValues={{ name: name }}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        );
    }

    render() {
        return (
            <Spin spinning={this.state.loading}>
                <Typography.Title level={1}>Todos</Typography.Title>

                <Space direction={'vertical'} style={{ width: '100%' }} size="large">
                    {this.renderAddTodoForm()}
                    {this.renderList()}
                </Space>

                {this.renderModal()}
            </Spin>
        );
    }

    fetchData = async () => {
        try {
            const response = await fetch(baseUri);
            const data = await response.json();

            this.setState({
                items: data,
                loading: false
            });
        } catch (err) {
            this.setState({
                loading: false
            });
            console.error(err);
        }
    }
}

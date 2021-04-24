import { Button, Input, Modal, Select, Form } from "semantic-ui-react";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { add } from "../utils/itemsAPI.js";
import serializeForm from "form-serialize";

class Additem extends Component {
    state = {
        open: true,
        itemName: "",
        type: "",
        data: {
            itemName: "",
            itemType: "",
        },
    };

    onChange = (e, sel) =>
        this.setState({
            data: { ...this.state.data, [sel.name]: sel.value },
        });

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log(this.state.data);
        this.props.triggerMove(this.state.data["itemName"], this.state.data["itemType"]);
        let r = await add(this.state.data["itemName"], this.state.data["itemType"]);
        if (r["Result"] !== "OK") {
            alert(r["Reason"]);
        } else {
            alert("Succeed");
        }
        this.props.history.push("/todo");
    };

    newitemForm = (data, types, handleSubmit) => {
        return (
            <Form onSubmit={handleSubmit}>
                <Form.Group widths="equal">
                    <Form.Field>
                        <Input placeholder="item Name" name="itemName" value={data.itemName} onChange={this.onChange} />
                    </Form.Field>
                    <Form.Field>
                        <Select
                            placeholder="Select item Category"
                            name="itemType"
                            value={data.itemType}
                            options={types}
                            onChange={this.onChange}
                        />
                    </Form.Field>
                </Form.Group>
                <Button type="submit">Add</Button>
            </Form>
        );
    };

    render() {
        const { types } = this.props;
        const { open, data } = this.state;
        return (
            <Modal
                open={open}
                onClose={() => {
                    this.setState({ open: false });
                    this.props.history.push("/todo");
                }}
            >
                <Modal.Header>Add a item</Modal.Header>
                <Modal.Content>{this.newitemForm(data, types, this.handleSubmit)}</Modal.Content>
            </Modal>
        );
    }
}

export default withRouter(Additem);

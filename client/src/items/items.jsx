import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";
import { get, move } from "../utils/itemsAPI.js";
import Singleitem from "./Singleitem.jsx";

class Items extends Component {
    propTypes = {
        type: Proptypes.string.isRequired,
        triggerMove: Proptypes.func.isRequired,
    };
    state = {
        [this.props.type]: [],
        showingItem: [],
        query: "",
        type: this.props.type,
    };

    componentDidMount() {
        const { type } = this.props;
        get(type)
            .then((items) => {
                if (items["Error"]) {
                    console.error(`${items["Error"]}`);
                }
                return items;
            })
            .then((items) =>
                this.setState({
                    [type]: items["Result"],
                    showingItem: items["Result"],
                })
            );
    }

    searchItem(value) {
        this.setState({ query: value });
    }

    clearQuery() {
        this.setState({ query: "" });
    }

    searchBar = (type, query) => {
        return (
            <div className="search-items" style={{ margin: "5%" }}>
                <div className="search-items-bar" style={{ position: "sticky" }}>
                    <button className="close-search" onClick={() => this.clearQuery()}></button>
                    <div className="search-items-input-wrapper">
                        <input
                            type="text"
                            placeholder={`Search by title in ${type}`}
                            value={query}
                            onChange={(event) => this.searchItem(event.target.value)}
                        />
                    </div>
                </div>
            </div>
        );
    };

    moveItem = async (from, item, to) => {
        this.setState((current) => {
            return {
                [current["type"]]: current[current["type"]].filter((e) => e !== item),
            };
        });
        this.props.triggerMove(item, to);
        let r = await move(from, item, to);
        if (r["Result"] !== "OK") {
            alert(r["Reason"]);
        } else {
            alert("Succeed");
        }
    };

    addItem = (item) => {
        this.setState((current) => {
            current[current["type"]].push(item);
            return { [current["type"]]: current[current["type"]] };
        });
    };

    render() {
        const { type } = this.props;
        let { showingItem, query } = this.state;
        const match = new RegExp(escapeRegExp(query), "i");
        if (query) {
            showingItem = this.state[type].filter((i) => match.test(i)).sort();
        } else {
            showingItem = this.state[type];
        }
        return (
            <div>
                {this.searchBar(type, query)}
                <div className="itemshelf-title" style={{ fontWeight: "bolder", fontSize: "xx-large" }}>
                    {type}
                </div>
                <div className="itemshelf-items">
                    <ol className="items-grid">
                        {showingItem.map((b, i) => {
                            return <Singleitem type={type} i={i} b={b} m={this.moveItem} />;
                        })}
                    </ol>
                </div>
                <div className="open-search" style={{ position: "sticky" }}>
                    {/*<button style={ { background: "#FFC107" } } onClick={ () => {*/}
                    {/*} }>Add a item*/}
                    {/*</button>*/}
                    <Link
                        style={{
                            background: "#FFC107",
                            display: "block",
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            backgroundImage:
                                "url(module.exports = &quot;data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjZmZmZmZmIi…ZD0iTTE5IDEzaC02djZoLTJ2LTZINXYtMmg2VjVoMnY2aDZ2MnoiLz4KPC9zdmc+Cg==&quot;)",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "28px",
                            boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
                            fontSize: "0",
                            outline: "0",
                        }}
                        className="close-create-contact"
                        to="/todo/additem"
                    >
                        Add a item
                    </Link>
                </div>
            </div>
        );
    }
}

export default Items;

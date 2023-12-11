import React from "react";

class SelectBox extends React.Component {
    state = {
        items: this.props.items || [],
        showItems: false,
        selectedItem: localStorage.getItem("language") != null ? localStorage.getItem("language") == "sr" ? this.props.items[1] : this.props.items[0] : this.props.items && this.props.items[0]
    };

    dropDown = () => {
        this.setState(prevState => ({
            showItems: !prevState.showItems
        }));
    };

    selectItem = item => {
        this.setState({
            selectedItem: item,
            showItems: false
        });
        window.location.reload()
    };

    render() {
        return (
            <div className="select-box--box">
                <div className="select-box--container">
                    <div className="select-box--selected-item" onClick={this.dropDown}>
                        {this.state.selectedItem.value} <img src={this.state.selectedItem.icon} />
                    </div>
                    <div
                        style={{ display: this.state.showItems ? "block" : "none" }}
                        className={"select-box--items"}
                    >
                        <div className="drop">
                            {this.state.items.map(item => (
                                <div
                                    key={item.id}
                                    onClick={() => {
                                        this.selectItem(item)
                                        localStorage.setItem("language", item.lang)
                                    }}
                                    className={this.state.selectedItem == item ? "selected" : ""}
                                >
                                    {item.value} <img src={item.icon} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SelectBox;

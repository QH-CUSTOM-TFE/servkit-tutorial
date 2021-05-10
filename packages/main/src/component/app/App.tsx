import * as React from 'react';
import './App.scss';


import Button from 'antd/lib/button';
import 'antd/lib/button/style/css';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';

import { Sapp } from 'servkit';

interface Props {
    app: Sapp;
}

interface State {
    showButton: boolean;
    hideButton: boolean;
}

export class App extends React.Component<Props, State> {
    private elContent = React.createRef<HTMLDivElement>();
    state = {
        showButton: false,
        hideButton: false,
    }

    render() {
        return (
            <div className="app-container">
                <div className="app-container-header">
                    { this.props.app.info.name }
                    <div className="app-container-header-operations">
                        { this.state.showButton && <Icon type="plus-circle" onClick={() => this.onClickShow()} /> }
                        { this.state.hideButton && <Icon type="minus-circle" onClick={() => this.onClickHide()} /> }
                        <Icon type="close-circle" onClick={() => this.onClickClose()} />
                    </div>
                </div>
                <div className="app-container-content" ref={this.elContent}>
                </div>
            </div>
        )
    }

    componentDidMount() {
        if (!this.elContent.current) {
            this.props.app.close();
        } else {
            this.props.app.getController().setLayoutOptions({
                container: this.elContent.current,
                className: 'app-container-content-iframe',
            })
            this.props.app.start().then(() => {
                this.setState({
                    showButton: false,
                    hideButton: true,
                })
            });
        }
    }

    onClickShow() {
        this.props.app.show().then((yes) => {
            if (yes) {
                this.setState({
                    showButton: false,
                    hideButton: true,
                });
            }
        });
    }

    onClickHide() {
        this.props.app.hide().then((yes) => {
            if (yes) {
                this.setState({
                    showButton: true,
                    hideButton: false,
                });
            }
        });
    }

    onClickClose() {
        this.props.app.close();
    }
};

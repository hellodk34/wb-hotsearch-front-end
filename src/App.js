import React, { PureComponent } from "react";
import ReactClipboard from "react-clipboardjs-copy";
import { Table, Button } from "antd";
import "./App.css";
import request from "./HttpHelper.js";

class Markdown extends PureComponent {
    state = {
        result: null,
        loading: true,
    };

    componentDidMount() {
        let url = window.location.href;
        let pathName = window.location.pathname;
        let index = url.indexOf(pathName);
        let requestUrl = url.substring(index, url.length);
        request(requestUrl, {
            method: "GET",
        }).then((res) => {
            if (res) {
                this.setState({
                    result: res,
                    loading: false,
                });
            }
        });
    }

    render() {
        const { result, loading } = this.state;
        const detail = result && result.success === true && result.detail;
        const postTitle = detail && detail.postTitle;
        const content = detail && detail.content;
        var jsonStr = JSON.parse(content);
        const columns = [
            {
                title: "序号",
                dataIndex: "pic",
                key: "pic",
                fixed: "left",
                render: (text, record) => (
                    <img className="imageee" src={text} alt={record.desc} />
                ),
            },
            {
                title: "标题",
                dataIndex: "desc",
                fixed: "left",
                key: "desc",
                render: (text, record) => (
                    <a href={record.scheme} target="_blank" rel="noreferrer">
                        {" "}
                        <span> {text} </span>
                    </a>
                ),
            },
            {
                title: "热度",
                dataIndex: "desc_extr",
                key: "desc_extr",
                render: (text) => <span> {text} </span>,
            },
            {
                title: "操作",
                key: "ageee",
                render: (text, record) => {
                    //const titleAndLink = '【' + record.desc + '】 ' + record.scheme;
                    const titleAndLink = `【${record.desc}】\n\n${record.scheme}`
                    return (
                        <div id="copyButton">
                            <ReactClipboard text={record.desc}>
                                <Button type="primary">Copy title</Button>
                            </ReactClipboard>
                            &nbsp;
                            <ReactClipboard text={record.scheme}>
                                <Button type="primary">Copy link</Button>
                            </ReactClipboard>
                            &nbsp;
                            <ReactClipboard text={titleAndLink}>
                                <Button type="primary">Copy title and link</Button>
                            </ReactClipboard>
                        </div>
                    );
                },
            },
        ];

        return (
            <div id="marginmycolor">
                <div className="titleDiv">
                    <div id="title">{postTitle}</div>
                </div>
                <Table
                    className="markdown-body"
                    rowKey={(record) => record.desc}
                    dataSource={jsonStr}
                    columns={columns}
                    loading={loading}
                    pagination={false}
                    bordered={true}
                />
                <footer class="footer-area footer--light">
                    <div class="mini-footer">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="copyright-text">
                                        <p>© 2021
                                            <a href="https://hellodk.com" target="_blank" rel="noreferrer"> hellodk.com</a> All rights reserved.
                                        </p>
                                        <p>
                                            Telegram channel: <a href="https://t.me/weibo_hot_search" target="_blank" rel="noreferrer"> 微博热搜实时推送</a>.
                                        </p>
                                        <p>
                                            Powered by <a href="https://github.com/hellodk34/weibo_hot_search" target="_blank" rel="noreferrer"> weibo_hot_search</a>.
                                        </p>
                                    </div>
                                    {/* <div class="go_top">
                                        <span class="icon-arrow-up"></span>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Markdown;

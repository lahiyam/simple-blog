import React, { Component, MouseEvent } from "react";
import { Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import GlobalContext from "../contexts/GlobalContext";
import PostQuillContainer from "./PostQuillContainer";
import * as quill from "quill";
export type PostProps = {
  id?: string;
  title: string | JSX.Element;
  createdAt?: number;
  content: quill.Delta | string;
  username?: JSX.Element | string;
  tags?: Set<string>;
  canBeModal?: boolean;
} | null;
class Post extends Component<PostProps> {
  static contextType = GlobalContext;

  constructor(props: PostProps) {
    super(props);
    this.onClickListener = this.onClickListener.bind(this);
  }

  onClickListener(event: MouseEvent): void {
    event.preventDefault();
    this.context.updateModal({
      enabled: true,
      title: this.props.title,
      body: this.props.content,
      footer: this.props.username
    });
  }

  render() {
    const title = (
      <Card.Title className="display-4">{this.props.title}</Card.Title>
    );
    return (
      <Card className={`mt-4 mb-4 ${this.props.canBeModal && "card-modal"}`}>
        <Card.Body>
          {this.props.canBeModal ? (
            <LinkContainer
              onClick={this.onClickListener}
              to={`/post/${this.props.id}`}
              style={{ cursor: "pointer" }}
            >
              {title}
            </LinkContainer>
          ) : (
            <>{title}</>
          )}
          {this.props.createdAt && (
            <>
              <Card.Text>
                <small className="text-muted">
                  Created on {new Date(this.props.createdAt).toString()}
                </small>
              </Card.Text>
              <hr />
            </>
          )}
          {typeof this.props.content === "object" ? (
            <PostQuillContainer content={this.props.content} />
          ) : (
            <Card.Text>{this.props.content}</Card.Text>
          )}
          <hr />
          <Card.Text>
            <small>
              By{" "}
              <a href={`/user/${this.props.username}`}>{this.props.username}</a>
            </small>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default Post;

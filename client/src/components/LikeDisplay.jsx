import React, { useState } from "react";
import { Modal, Button, List } from "semantic-ui-react";

const LikesDisplay = ({ likes }) => {
  const [open, setOpen] = useState(false);

  if (!likes || likes.length === 0) return null;

  const visibleLikes = likes.slice(0, 3);
  const remainingCount = likes.length - visibleLikes.length;

  return (
    <>
      <p style={{ marginTop: "2px", marginBottom: "8px" }}>
        <strong>Liked by:</strong>{" "}
        {visibleLikes.map((like) => like.username).join(", ")}
        {remainingCount > 0 && (
          <>
            {" "}
            and{" "}
            <span
              style={{
                color: "teal",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={() => setOpen(true)}
            >
              {remainingCount} others
            </span>
          </>
        )}
      </p>

      <Modal
        onClose={() => setOpen(false)}
        open={open}
        size="tiny"
      >
        <Modal.Header>All Likes</Modal.Header>
        <Modal.Content scrolling>
          <List divided relaxed>
            {likes.map((like) => (
              <List.Item key={like.username}>
                <List.Icon name="user" size="large" verticalAlign="middle" />
                <List.Content>
                  <List.Header>{like.username}</List.Header>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpen(false)} color="teal">
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default LikesDisplay;

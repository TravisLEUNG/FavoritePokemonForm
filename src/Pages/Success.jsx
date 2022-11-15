import Card from "react-bootstrap/Card";

export default function Success(props) {
  return (
    <Card className="success">
      <Card.Body>
        <Card.Title className="success_title">
          Thank you for the information {props.data["FirstName"]}✨
        </Card.Title>
        <Card.Text className="success_text">
          Maybe you will become the world champion someday. Have a nice day !
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

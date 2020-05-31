import React, { useState } from "react";
import {
  Button,
  Card,
  Container,
  CardContent,
  TextField,
  CardActions,
  Paper,
  Typography,
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import axios from "axios";

function App() {
  const [q, setQ] = useState("");
  const [data, setData] = useState();

  const getData = () =>
    axios
      .post("https://asia-east2-twit-hash-sentiment.cloudfunctions.net/tweep", {
        q: q,
        result: "popular",
        lang: "en",
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography style={{ margin: "1rem" }} variant="h4">
            🐦 Search sentiment related to #tags , @users
          </Typography>
          <form
            noValidate
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              getData();
            }}
          >
            <TextField
              id="filled-full-width"
              label="Query"
              style={{ margin: 8 }}
              helperText="Eg: #opensource, @ar1242112, chicken"
              fullWidth
              margin="normal"
              variant="outlined"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </form>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={getData}
          >
            <SearchOutlined></SearchOutlined> Search
          </Button>
        </CardActions>
      </Card>

      <Paper style={{ marginTop: "1rem" }}>
        <Container>
          {data ? (
            <div style={{ marginTop: "1rem" }}>
              <Typography style={{ margin: "1rem" }} variant="h3">
                Results
              </Typography>
              {data.map((d) => (
                <Card variant="outlined">
                  <CardContent>
                    <Typography gutterBottom>{d.text}</Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      score : {d.sentiment.score}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : null}
        </Container>
      </Paper>
    </Container>
  );
}

export default App;

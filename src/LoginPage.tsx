import { useState } from "react";

import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Paper, Stack, TextField, Typography } from "@mui/material";

export const LoginPage = ({ onSuccess } = { onSuccess: () => {} }) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(false);

    try {
      const options = {
        method: "POST",
        body: JSON.stringify({ username, password }),
      };

      const response = await fetch("/.netlify/functions/login", options);

      if (response.ok) {
        onSuccess();
      } else {
        setError(true);
      }
    } catch (e) {
      console.log("error");
      setError(true);
    }

    setLoading(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Paper sx={{ padding: 2 }}>
        <form onSubmit={onFormSubmit}>
          <Stack spacing={2} sx={{ marginTop: 2 }}>
            <Typography variant="h6" component="div">
              {"Welcome to YourP"}
            </Typography>

            <TextField
              label="Username"
              error={error}
              required
              onChange={(e) => setUsername(e.currentTarget.value)}
              size="small"
            />
            <TextField
              label="Password"
              error={error}
              required
              onChange={(e) => setPassword(e.currentTarget.value)}
              size="small"
              type="password"
            />
            <LoadingButton loading={loading} variant="outlined" type="submit">
              Login
            </LoadingButton>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

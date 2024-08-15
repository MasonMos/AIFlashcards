"use client";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import Head from "next/head";

export default function Home() {
  const handleSubmit = async () => {
    const checkoutSession = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        origin: "http://localhost:3000",
      },
    });

    const checkoutSessionData = await checkoutSession.json();

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionData.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  return (
    <Container maxWidth="100vw">
      <Head>
        <title>Flashcards</title>
        <meta name="description" content="Create flashcards from your text" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Flashcard Saas
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">
              Login
            </Button>
            <Button color="inherit" href="/sign-up">
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Typography variant="h2"> Welcome to AI Flashcards</Typography>
        <Typography variant="h5">
          {""}
          Create flashcards from your text
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          href="/generate"
        >
          Get Started
        </Button>
      </Box>
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" component={"h2"}>
          Features
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h3">
              Easy text input
            </Typography>
            <Typography>
              Simply paste your text and get back flashcards
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h3">
              Smart Flashcards
            </Typography>
            <Typography>
              Breaks down your text into flashcards using AI
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h3">
              Accessible Anywhere
            </Typography>
            <Typography>Access your flashcards from any device</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 6, textAlign: "center" }}>
        <Typography variant="h4">Pricing</Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ border: "1px solid #ccc", p: 2, borderRadius: 2 }}>
              <Typography variant="h5" component="h3" gutterBottom>
                Basic
              </Typography>
              <Typography variant="h6" gutterBottom>
                $5/month
              </Typography>
              <Typography>Access to basic flashcard features</Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleSubmit}
              >
                Choose Basic
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ border: "1px solid #ccc", p: 2, borderRadius: 2 }}>
              <Typography variant="h5" component="h3" gutterBottom>
                Pro
              </Typography>
              <Typography variant="h6" gutterBottom>
                $5/month
              </Typography>
              <Typography>Unlimited flashcard and storage</Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleSubmit}
              >
                Choose Pro
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

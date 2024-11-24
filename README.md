# BlueSky MMT Feed Generator

Welcome to the **BlueSky MMT Feed Generator** project! This repository contains the source code for an algorithmically-driven feed focused on discussions around **Modern Monetary Theory (MMT)** on the BlueSky social network.

## Overview

The MMT Feed Generator uses the [ATProto protocol](https://atproto.com) to provide a custom feed that identifies, ranks, and serves posts related to MMT. It leverages:
- Python for backend logic.
- Meta LLaMA for advanced language modeling and topic analysis.
- BlueSky's firehose for real-time post indexing.
- SQLite for lightweight data storage.
- Flask/FastAPI for serving feed endpoints.

## Features
- **Real-Time Post Indexing**: Subscribes to BlueSky's firehose to collect and parse posts.
- **Algorithmic Filtering**: Uses keywords and an LLM model to identify MMT-related posts.
- **Relevance Scoring**: Ranks posts based on topic relevance and sentiment analysis.
- **Custom Feed API**: Serves curated feed skeletons compliant with BlueSky's `app.bsky.feed.getFeedSkeleton` specification.

## Getting Started

### Prerequisites
- Python 3.9+
- A [BlueSky developer account](https://bsky.app) with access to the ATProto Firehose.
- A hosted instance or development environment (e.g., Replit).

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/bluesky-mmt-feed.git
   cd bluesky-mmt-feed

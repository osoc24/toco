# Mock Apps

This repository contains the mock apps that are used to demonstrate the usage of our access management app ( [LOAMA](https://github.com/osoc24/loama) ).

## 1. MockBook

MockBook is a social network that allows users to view their posts and friends.

**Data**

- profile: name, email, bio, profile picture
- posts: text, image, video
- friends: list of friends

## 2. DoctorApp

DoctorApp is a medical app that allows you to view your doctor appointments.

**Data**

- information: name, email, phone number
- appointments: date, time

## How to run

```sh
# Choose the app you want to run
cd mockbook
# or
cd doctorapp

# Install dependencies
pnpm install

# Compile and Hot-Reload for Development
pnpm dev

# Build for production
pnpm build

```

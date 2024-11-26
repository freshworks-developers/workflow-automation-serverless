Freshdesk Onboarding Reminder App
=================================

A Freshdesk app that automatically sends reminder emails to ticket requesters after a specified delay and closes the ticket upon receiving a reply.

Table of Contents
-----------------

-   [Introduction](#introduction)
-   [Features](#features)
-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Configuration](#configuration)
-   [Usage](#usage)
-   [Contributing](#contributing)
-   [License](#license)

Introduction
------------

The **Freshdesk Onboarding Reminder App** is designed to enhance customer support efficiency by automating follow-up reminders and ticket closures. When a ticket is created via email, the app schedules a reminder email to be sent after a specified delay. If the customer replies to the reminder, the app automatically closes the ticket.

Features
--------

-   Automatically sends reminder emails to customers for pending tickets.
-   Closes tickets upon receiving a customer reply.
-   Customizable time delay for sending reminders.
-   Secure handling of API keys and credentials.

Prerequisites
-------------

-   **Freshdesk account** with API access.
-   **Freshworks Developer Kit (FDK)** installed.
-   **Node.js** version 18.19.0 or compatible with FDK 9.1.0.
-   Valid **Freshdesk domain** and **API key**.

Installation
------------

1.  **Clone the Repository**

    `git clone https://github.com/yourusername/freshdesk-onboarding-reminder.git
    cd freshdesk-onboarding-reminder`

2.  **Install Dependencies**

    `npm install`

3.  **Install the Freshworks FDK**

    Ensure you have the Freshworks FDK installed globally:

    `npm install -g @freshworks/cli`

Configuration
-------------

1.  **Set Up Installation Parameters**

    In the `config/` directory, update the `iparams.json` file with your Freshdesk domain and API key:

2.  **Configure Request Templates**

    In the `config/` directory, ensure the `requests.json` file is correctly set up:

3.  **Update the Manifest File**

    Ensure your `manifest.json` file is correctly configured:

Usage
-----

1.  **Run the App**

    Start the app using the FDK:

    `fdk run`

2.  **Set Up External Scheduler**

    Since the app requires a scheduled function to send reminders, set up an external scheduler (e.g., cron job) to periodically invoke the `reminderFunction`.

3.  **Test the Workflow**

    -   **Create a Ticket**

        Send an email to your Freshdesk support email to create a new ticket.

    -   **Wait for Reminder**

        Allow the external scheduler to trigger the reminder function after the specified delay.

    -   **Receive Reminder Email**

        Confirm that the reminder email is sent to the ticket requester.

    -   **Reply to Reminder**

        Reply to the reminder email as the requester.

    -   **Ticket Closure**

        Verify that the ticket is automatically closed upon receiving the reply.


exports = {
    // Handler for the 'onTicketCreate' event
    onTicketCreateHandler: async function (args) {
      const { data, iparams } = args;
      const ticket = data.ticket;
  
      // Check if the ticket was created via email
      if (ticket.channel === 'email') {
        try {
          // Store the ticket ID and the email of the ticket requester along with the reminder time
          const timeDelayMinutes = iparams.time_delay_minutes || 10;
          const reminderTime = Date.now() + timeDelayMinutes * 60 * 1000;
  
          await $db.set(`ticket:${ticket.id}`, {
            email: ticket.requester.email,
            reminderTime: reminderTime
          });
        } catch (error) {
          console.error('Error in onTicketCreateHandler:', error);
        }
      }
    },
  
    // Handler for the 'onConversationCreate' event
    onConversationCreateHandler: async function (args) {
      const { data } = args;
      const conversation = data.conversation;
      const ticket = data.ticket;
  
      try {
        // Check if the conversation is a customer reply
        if (conversation.incoming) {
          const ticketKey = `ticket:${ticket.id}`;
          const ticketData = await $db.get(ticketKey);
          if (ticketData) {
            // Close the ticket
            await $request.invokeTemplate('close_ticket', {
              context: {
                ticket_id: ticket.id
              },
              body: JSON.stringify({
                status: 5
              })
            });
  
            // Remove the ticket from the database
            await $db.delete(ticketKey);
          }
        }
      } catch (error) {
        console.error('Error in onConversationCreateHandler:', error);
      }
    },
  
    // Function to handle scheduled reminders
    reminderFunction: async function () {
      try {
        // Fetch all tickets stored in the database
        const tickets = await $db.listAll();
  
        for (const ticketEntry of tickets) {
          const ticketData = ticketEntry.value;
          const ticket_id = ticketEntry.key.split(':')[1];
  
          // Check if it's time to send the reminder
          if (Date.now() >= ticketData.reminderTime) {
            // Send the reminder email
            await $request.invokeTemplate('send_reminder_email', {
              context: {
                ticket_id: ticket_id
              },
              body: JSON.stringify({
                body: "This is a reminder email."
              })
            });
  
            // Remove the ticket from the database as the reminder has been sent
            await $db.delete(`ticket:${ticket_id}`);
          }
        }
      } catch (error) {
        console.error('Error in reminderFunction:', error);
      }
    }
  };
  
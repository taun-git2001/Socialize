document.addEventListener('DOMContentLoaded', function() {
    const inboxContainer = document.getElementById('inbox-container');

    // Sample messages data
    const messages = [
        { user: "User1", text: "Hello! How are you?" },
        { user: "User2", text: "Don't forget the meeting tomorrow." },
        { user: "User3", text: "Can we reschedule our call?" },
        { user: "User4", text: "Happy Birthday!" },
        { user: "User5", text: "Check out this cool link." }
    ];

    messages.forEach(message => {
        const messageItem = document.createElement('div');
        messageItem.classList.add('list-group-item');
        messageItem.innerHTML = `
            <h5 class="mb-1">${message.user}</h5>
            <p class="mb-1">${message.text}</p>
        `;
        inboxContainer.appendChild(messageItem);
    });
});

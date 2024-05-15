// Get all the menu items
const menuItems = document.querySelectorAll('.navbar ul li a');

// Add event listeners to each menu item
menuItems.forEach(item => {
    // Get the alternative text
    const altText = item.getAttribute('data-alt-text');

    // Create a span element for the alternative text
    const altTextSpan = document.createElement('span');
    altTextSpan.className = 'alt-text';
    altTextSpan.textContent = altText;

    // Append the alternative text span to the menu item
    item.appendChild(altTextSpan);

    // Hide the alternative text span initially
    altTextSpan.style.display = 'none';

    // Add event listeners
    item.addEventListener('mouseenter', () => {
        altTextSpan.style.display = 'inline'; // Show alternative text
    });

    item.addEventListener('mouseleave', () => {
        altTextSpan.style.display = 'none'; // Hide alternative text
    });
});

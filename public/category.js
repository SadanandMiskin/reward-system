const categories = {
    communication: ["Chat & messaging", "Email", "Fax", "Phone", "Social networking", "Video conferencing"],
    entertainment: ["Books & comics", "Music & audio", "Movies & TV", "News & magazines", "Photography", "Social networking", "Video players & editors"],
    events: ["Concerts & festivals", "Conferences & trade shows", "Sports events", "Theater & dance"],
    fitness: ["Diet & nutrition", "Exercise & fitness", "Medical", "Mental health", "Self-care", "Sleep & relaxation"],
    social: ["Chat & messaging", "Dating", "Friend finding", "Location-based social", "Social networking"]
    
}

const categorySelect = document.getElementById("categorySelect")
const subcategorySelect = document.getElementById("subcategorySelect")

categorySelect.addEventListener("change", function() {
    const selectedCategory = categorySelect.value
    const subcategories = categories[selectedCategory] || []

    subcategorySelect.innerHTML = ""

    subcategories.forEach(subcategory => {
        const option = document.createElement("option")
        option.value = subcategory
        option.text = subcategory
        subcategorySelect.appendChild(option)
    })
})

updateSubcategories()

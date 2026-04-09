document.addEventListener('DOMContentLoaded', () => {

    loadJobs()
    const form = document.getElementById('jobForm')

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const editId = document.getElementById('editId').value
        const company = document.getElementById('company').value
        const title = document.getElementById('title').value
        const status = document.getElementById('status').value
        const date = document.getElementById('date').value

        if (editId) {
            fetch(`/jobs/${editId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ company, title, status, date })
            })
            .then(response => response.json())
            .then(data => {
                loadJobs()
                form.reset()
                document.getElementById('editId').value = ''
                document.querySelector('button[type="submit"]').textContent = '+ Add Application'
            })
            .catch(err => console.log('Error:', err))

        } else {
            fetch('/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ company, title, status, date })
            })
            .then(response => response.json())
            .then(data => {
                loadJobs()
                form.reset()
            })
            .catch(err => console.log('Error:', err))
        }
    })
})

function loadJobs() {
    fetch('/jobs')
    .then(response => response.json())
    .then(jobs => {
        const jobList = document.getElementById('jobList')
        jobList.innerHTML = ''

        document.getElementById('totalJobs').textContent = jobs.length
        document.getElementById('totalInterview').textContent = jobs.filter(j => j.status === 'Interview').length
        document.getElementById('totalAccepted').textContent = jobs.filter(j => j.status === 'Accepted').length
        document.getElementById('totalRejected').textContent = jobs.filter(j => j.status === 'Rejected').length

        jobs.forEach(job => {
            const row = document.createElement('div')
            row.className = 'job-row'
            const initial = job.company.charAt(0).toUpperCase()
            row.innerHTML = `
                <div class="row-main">
                    <div class="company-cell">
                        <div class="company-avatar">${initial}</div>
                        <span class="company-name">${job.company}</span>
                    </div>
                    <div class="title-cell">${job.title}</div>
                    <div class="status-cell">
                        <span class="status-badge status-${job.status}">${job.status}</span>
                    </div>
                    <div class="date-cell">📅 ${new Date(job.date).toLocaleDateString()}</div>
                    <div class="actions-cell">
                        <button class="edit-btn" onclick="editJob('${job._id}', '${job.company}', '${job.title}', '${job.status}', '${job.date}')">✏️</button>
                        <button class="delete-btn" onclick="deleteJob('${job._id}')">🗑️</button>
                        <button class="advice-btn" onclick="getAdvice('${job._id}', '${job.company}', '${job.title}', '${job.status}', '${job.date}')">AI 🤖</button>
                    </div>
                </div>
                <div id="advice-${job._id}" class="advice-box"></div>
            `
            jobList.appendChild(row)
        })
    })
    .catch(err => console.log('Error loading jobs:', err))
}

function getAdvice(id, company, title, status, date) {
    const adviceBox = document.getElementById(`advice-${id}`)
    if (adviceBox.style.display === 'block') {
        adviceBox.style.display = 'none'
        return
    }
    adviceBox.innerHTML = 'Getting AI advice... 🤖'
    adviceBox.style.display = 'block'

    fetch('/ai/advice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ company, title, status, date })
    })
    .then(response => response.json())
    .then(data => {
        adviceBox.innerHTML = `<p>${data.advice}</p>`
    })
    .catch(err => {
        adviceBox.innerHTML = 'Error getting advice. Please try again!'
    })
}

function deleteJob(id) {
    if (!confirm('Are you sure you want to delete this application?')) return

    fetch(`/jobs/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        loadJobs()
    })
    .catch(err => console.log('Error deleting job:', err))
}

function editJob(id, company, title, status, date) {
    document.getElementById('editId').value = id
    document.getElementById('company').value = company
    document.getElementById('title').value = title
    document.getElementById('status').value = status
    document.getElementById('date').value = new Date(date).toISOString().split('T')[0]
    document.querySelector('button[type="submit"]').textContent = '✏️ Update Application'
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const quotes = [
    { text: "The secret of getting ahead is getting started.", author: "— Mark Twain" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "— Winston Churchill" },
    { text: "The only way to do great work is to love what you do.", author: "— Steve Jobs" },
    { text: "Believe you can and you're halfway there.", author: "— Theodore Roosevelt" },
    { text: "Your time is limited, don't waste it living someone else's life.", author: "— Steve Jobs" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "— Confucius" },
    { text: "Every expert was once a beginner.", author: "— Helen Hayes" }
]

let currentQuote = 0

function loadQuote() {
    const quote = quotes[currentQuote]
    document.getElementById('quoteText').textContent = `"${quote.text}"`
    document.getElementById('quoteAuthor').textContent = quote.author

    const dotsContainer = document.getElementById('quoteDots')
    dotsContainer.innerHTML = ''
    quotes.forEach((q, index) => {
        const dot = document.createElement('span')
        dot.className = `quote-dot ${index === currentQuote ? 'active' : ''}`
        dot.onclick = () => {
            currentQuote = index
            loadQuote()
        }
        dotsContainer.appendChild(dot)
    })
}

// Auto rotate quotes every 10 seconds
setInterval(() => {
    currentQuote = (currentQuote + 1) % quotes.length
    loadQuote()
}, 10000)

// Load first quote
loadQuote()
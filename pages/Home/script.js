let arrow = document.querySelectorAll(".arrow");
for (var i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener("click", (e)=>{
 let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
 arrowParent.classList.toggle("showMenu");
  });
}



let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");
console.log(sidebarBtn);
sidebarBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("close");
});



document.addEventListener("DOMContentLoaded", function () {
  let sidebar = document.querySelector(".sidebar");
  let menuIcon = document.querySelector(".bx-menu");

  // Toggle sidebar on menu button click
  menuIcon.addEventListener("click", function () {
    sidebar.classList.toggle("close");
  });

  // Auto-expand sidebar on hover
  sidebar.addEventListener("mouseenter", function () {
    sidebar.classList.remove("close");
  });

  // Auto-hide sidebar when not hovered
  sidebar.addEventListener("mouseleave", function () {
    sidebar.classList.add("close");
  });
});



// Get the theme toggle button and icon
const themeToggleButton = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Add an event listener to the button to toggle themes
themeToggleButton.addEventListener('click', () => {
// Toggle the 'dark-theme' and 'light-theme' classes on the body
document.body.classList.toggle('dark-theme');
document.body.classList.toggle('light-theme');

// Toggle the 'dark-theme' and 'light-theme' classes on the sidebar and home-section
document.querySelector('.sidebar').classList.toggle('dark-theme');
document.querySelector('.sidebar').classList.toggle('light-theme');
document.querySelector('.home-section').classList.toggle('dark-theme');
document.querySelector('.home-section').classList.toggle('light-theme');

// Toggle the icon between sun and moon
if (themeIcon.classList.contains('fa-sun')) {
  themeIcon.classList.remove('fa-sun');
  themeIcon.classList.add('fa-moon');
} else {
  themeIcon.classList.remove('fa-moon');
  themeIcon.classList.add('fa-sun');
}
});



const themeToggle = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme") || "light";

document.body.setAttribute("data-theme", currentTheme);
themeToggle.innerHTML = currentTheme === "dark" ? "☀️" : "🌙";

themeToggle.addEventListener("click", () => {
  const newTheme = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
  document.body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  themeToggle.innerHTML = newTheme === "dark" ? "☀️" : "🌙";
});




// Function to create stars
function createStars() {
const starsContainer = document.createElement('div');
starsContainer.classList.add('stars');
document.querySelector('.sidebar').appendChild(starsContainer);

// Number of stars
const starCount = 100;

for (let i = 0; i < starCount; i++) {
  const star = document.createElement('div');
  star.classList.add('star');
  star.style.width = `${Math.random() * 3}px`; // Random size (1px to 3px)
  star.style.height = star.style.width;
  star.style.top = `${Math.random() * 100}%`; // Random vertical position
  star.style.left = `${Math.random() * 100}%`; // Random horizontal position
  star.style.animationDuration = `${Math.random() * 2 + 1}s`; // Random animation speed (1s to 3s)
  starsContainer.appendChild(star);
}
}
// Call the function to create stars
createStars();


// Theme Toggle Function
function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  updateChartThemes();
}

// Function to Update Chart Themes
function updateChartThemes() {
  const isDarkTheme = document.body.classList.contains('dark-theme');
  const theme = isDarkTheme ? 'dark' : 'light';

  // Update all charts
  Highcharts.charts.forEach(chart => {
    if (chart) {
      chart.update({
        chart: {
          backgroundColor: isDarkTheme ? '#1e1e1e' : '#ffffff',
        },
        title: {
          style: {
            color: isDarkTheme ? '#fff' : '#333',
          },
        },
        xAxis: {
          labels: {
            style: {
              color: isDarkTheme ? '#fff' : '#333',
            },
          },
          title: {
            style: {
              color: isDarkTheme ? '#fff' : '#333',
            },
          },
        },
        yAxis: {
          labels: {
            style: {
              color: isDarkTheme ? '#fff' : '#333',
            },
          },
          title: {
            style: {
              color: isDarkTheme ? '#fff' : '#333',
            },
          },
        },
        legend: {
          itemStyle: {
            color: isDarkTheme ? '#fff' : '#333',
          },
        },
      });
    }
  });
}

// Initialize Charts
Highcharts.chart('lineChart', {
  chart: { type: 'line', backgroundColor: 'transparent' },
  title: { text: 'Line Chart', style: { color: '#333' } },
  xAxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], labels: { style: { color: '#333' } } },
  yAxis: { title: { text: 'Values', style: { color: '#333' } }, labels: { style: { color: '#333' } } },
  series: [
    { name: 'Series 1', data: [1, 3, 2, 4, 5, 7] },
    { name: 'Series 2', data: [4, 2, 5, 1, 6, 3] }
  ]
});

Highcharts.chart('pieChart', {
  chart: { type: 'pie', backgroundColor: 'transparent' },
  title: { text: 'Pie Chart', style: { color: '#333' } },
  series: [{
    name: 'Data',
    data: [
      ['Category 1', 45],
      ['Category 2', 30],
      ['Category 3', 25]
    ]
  }]
});

Highcharts.chart('donutChart', {
  chart: { type: 'pie', backgroundColor: 'transparent' },
  title: { text: 'Donut Chart', style: { color: '#333' } },
  plotOptions: {
    pie: { innerSize: '50%' } // Makes it a donut chart
  },
  series: [{
    name: 'Data',
    data: [
      ['Category 1', 45],
      ['Category 2', 30],
      ['Category 3', 25]
    ]
  }]
});

Highcharts.chart('barChart', {
  chart: { type: 'bar', backgroundColor: 'transparent' },
  title: { text: 'Bar Chart', style: { color: '#333' } },
  xAxis: { categories: ['Category 1', 'Category 2', 'Category 3', 'Category 4'], labels: { style: { color: '#333' } } },
  yAxis: { title: { text: 'Values', style: { color: '#333' } }, labels: { style: { color: '#333' } } },
  series: [
    { name: 'Series 1', data: [5, 10, 15, 20] },
    { name: 'Series 2', data: [10, 15, 10, 5] }
  ]
});

Highcharts.chart('scatterPlot', {
  chart: { type: 'scatter', backgroundColor: 'transparent' },
  title: { text: 'Scatter Plot', style: { color: '#333' } },
  xAxis: { title: { text: 'X-Axis', style: { color: '#333' } }, labels: { style: { color: '#333' } } },
  yAxis: { title: { text: 'Y-Axis', style: { color: '#333' } }, labels: { style: { color: '#333' } } },
  series: [{
    name: 'Data Points',
    data: [
      [1, 5], [2, 8], [3, 3], [4, 7], [5, 2]
    ]
  }]
});

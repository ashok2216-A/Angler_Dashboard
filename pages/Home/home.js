// Sidebar toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check and initialize sidebar functionality
    let arrow = document.querySelectorAll(".arrow");
    for (var i = 0; i < arrow.length; i++) {
      arrow[i].addEventListener("click", (e)=>{
        let arrowParent = e.target.parentElement.parentElement;
        arrowParent.classList.toggle("showMenu");
      });
    }
  
    let sidebar = document.querySelector(".sidebar");
    let sidebarBtn = document.querySelector(".bx-menu");
    if (sidebar && sidebarBtn) {
      sidebarBtn.addEventListener("click", ()=>{
        sidebar.classList.toggle("close");
      });
    }
  
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      const toggleIcon = themeToggle.querySelector('.toggle-icon');
      themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        if (toggleIcon) {
          toggleIcon.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
        }
      });
    }
  
    // Pomodoro timer functionality
    const pomodoroStart = document.getElementById('pomodoro-start');
    const pomodoroPause = document.getElementById('pomodoro-pause');
    const pomodoroReset = document.getElementById('pomodoro-reset');
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
  
    let timer;
    let minutes = 25;
    let seconds = 0;
    let isRunning = false;
  
    function startTimer() {
      if (!isRunning) {
        isRunning = true;
        pomodoroStart.disabled = true;
        pomodoroPause.disabled = false;
        
        timer = setInterval(() => {
          if (seconds === 0) {
            if (minutes === 0) {
              clearInterval(timer);
              isRunning = false;
              pomodoroStart.disabled = false;
              pomodoroPause.disabled = true;
              // Timer completed logic
              return;
            }
            minutes--;
            seconds = 59;
          } else {
            seconds--;
          }
          updateDisplay();
        }, 1000);
      }
    }
  
    function pauseTimer() {
      clearInterval(timer);
      isRunning = false;
      pomodoroStart.disabled = false;
      pomodoroPause.disabled = true;
    }
  
    function resetTimer() {
      clearInterval(timer);
      isRunning = false;
      minutes = 25;
      seconds = 0;
      updateDisplay();
      pomodoroStart.disabled = false;
      pomodoroPause.disabled = true;
    }
  
    function updateDisplay() {
      if (minutesDisplay && secondsDisplay) {
        minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        secondsDisplay.textContent = seconds.toString().padStart(2, '0');
      }
    }
  
    // Add event listeners only if elements exist
    if (pomodoroStart && pomodoroPause && pomodoroReset) {
      pomodoroStart.addEventListener('click', startTimer);
      pomodoroPause.addEventListener('click', pauseTimer);
      pomodoroReset.addEventListener('click', resetTimer);
    }
  
    // Time adjustment buttons
    const timeAdjustBtns = document.querySelectorAll('.time-adjust-btn');
    timeAdjustBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        const settingElement = btn.parentElement.querySelector('span');
        if (settingElement) {
          let value = parseInt(settingElement.textContent);
          
          if (action === 'increase') {
            value++;
          } else if (action === 'decrease' && value > 1) {
            value--;
          }
          
          settingElement.textContent = value;
          
          // Update timer settings
          if (settingElement.id === 'focus-time') {
            minutes = value;
            updateDisplay();
          }
        }
      });
    });
  
    // Learning stats chart
    const learningStatsChart = document.getElementById('learningStatsChart');
    if (learningStatsChart && typeof Highcharts !== 'undefined') {
      // Sample data for the chart
      const chartData = {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        series: [
          {
            name: 'Study Time (minutes)',
            data: [45, 60, 90, 30, 75, 120, 60]
          }
        ]
      };
  
      // Create chart using Highcharts
      Highcharts.chart(learningStatsChart, {
        chart: {
          type: 'column',
          backgroundColor: 'transparent'
        },
        title: {
          text: null
        },
        xAxis: {
          categories: chartData.categories
        },
        yAxis: {
          title: {
            text: 'Minutes'
          }
        },
        series: chartData.series,
        credits: {
          enabled: false
        },
        colors: ['#4d84e2']
      });
    }
  
    // Generate the heatmap
    generateHeatmap();
  
    // Function to generate heatmap
    function generateHeatmap() {
      const heatmapContainer = document.getElementById('activity-heatmap');
      if (!heatmapContainer) return;
  
      // Generate 53 weeks (1 year + 1 week)
      for (let week = 0; week < 53; week++) {
        const weekEl = document.createElement('div');
        weekEl.className = 'calendar-week';
  
        // Generate 7 days per week
        for (let day = 0; day < 7; day++) {
          const dayEl = document.createElement('div');
          dayEl.className = 'calendar-day';
          
          // Random activity level (0-4) for demonstration
          // In a real app, this would come from your database
          const level = Math.floor(Math.random() * 5);
          dayEl.setAttribute('data-level', level);
          
          // Special markers for achievements
          if (week === 25 && day === 3) {
            dayEl.innerHTML = '<i class="bx bxs-medal" style="font-size: 8px;"></i>';
            dayEl.classList.add('achievement-day');
          }
          
          // Add tooltip with activity details
          dayEl.setAttribute('data-tooltip', getTooltipText(level));
          
          weekEl.appendChild(dayEl);
        }
  
        heatmapContainer.appendChild(weekEl);
      }
    }
  
    // Function to get tooltip text based on activity level
    function getTooltipText(level) {
      const submissions = level === 0 ? 0 : level * Math.floor(Math.random() * 5 + 1);
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 365));
      const dateStr = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  
      if (level === 0) {
        return `No submissions on ${dateStr}`;
      } else {
        return `${submissions} submissions on ${dateStr}`;
      }
    }
  });
const RESTART_TIME = {
  "51.38.168.199:27015": [
    "8h00",
    "17h00"
  ],
  "51.38.168.203:27016": [
    "8h00",
    "17h00"
  ]
}

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, '0')}h${minutes.toString().padStart(2, '0')}m${seconds.toString().padStart(2, '0')}s`;
}

function convertTimeToSeconds(time) {
  const [hours, minutes] = time.split('h').map(Number);
  return hours * 3600 + minutes * 60;
}

function getNextRestartTime(serverIp) {
  const now = new Date();
  const currentTime = (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds();
  const restartTimes = RESTART_TIME[serverIp];
  if (!restartTimes) {
    return null;
  }

  for (const time of restartTimes) {
    const restartTime = convertTimeToSeconds(time);
    if (restartTime > currentTime) {
      return {
        remaining: formatTime(restartTime - currentTime),
        restartTime: time
      }
    }
  }

  const firstRestartTime = convertTimeToSeconds(restartTimes[0]);
  const secondsUntilMidnight = (24 * 3600) - currentTime;
  const remaining = secondsUntilMidnight + firstRestartTime;

  return {
    remaining: formatTime(remaining),
    restartTime: restartTimes[0]
  }
}

function updateRestartTimes() {
  document.querySelectorAll('.block-row.gmodStatusCard').forEach(card => {
    const serverIp = card.getAttribute('data-server-address');
    const restartInfo = getNextRestartTime(serverIp);

    if (restartInfo) {
      let restartDiv = card.querySelector('.gmodStatusRestart');
      if (restartDiv) {
        restartDiv.replaceChildren(); // Clear any existing content

        const strong = document.createElement('strong');
        strong.textContent = 'Prochain redémarrage';
        restartDiv.append(strong, `: ${restartInfo.restartTime} (dans ${restartInfo.remaining})`);

        return;
      }

      restartDiv = document.createElement('div');
      restartDiv.className = 'gmodStatusRestart';
      restartDiv.style.wordBreak = 'break-word';
      restartDiv.style.overflowWrap = 'break-word';
      restartDiv.style.marginTop = '0px';
      restartDiv.style.whiteSpace = 'normal';

      restartDiv.replaceChildren(); // Clear any existing content

      const strong = document.createElement('strong');
      strong.textContent = 'Prochain redémarrage';
      restartDiv.append(strong, `: ${restartInfo.restartTime} (dans ${restartInfo.remaining})`);

      card.querySelector('.gmodStatusMeta').appendChild(restartDiv);
    }

  });
}

updateRestartTimes();
setInterval(updateRestartTimes, 1000); // Update every second

console.log('GtaCityRP Restart Time extension loaded.');
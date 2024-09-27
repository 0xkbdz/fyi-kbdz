document.addEventListener("DOMContentLoaded", () => {
  const dataGrid = document.getElementById('dataGrid');
  const serverTypeahead = document.getElementById('serverTypeahead');
  const survivorTypeahead = document.getElementById('survivorTypeahead');

  let selectedSid = null;

  const renderDataGrid = (data, sid) => {
    // Clear the existing grid
    dataGrid.innerHTML = '';

    if (data.length === 0) return;

    // Dynamically generate the table based on schema
    const table = document.createElement('table');
    table.classList.add('table', 'is-striped', 'is-bordered');

    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Create table headers
    const headers = Object.keys(data[0]);
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Create table rows
    data.forEach(item => {
      const row = document.createElement('tr');
      headers.forEach(header => {
        const td = document.createElement('td');
	if (header === `psname`) {
		const a = document.createElement('a');
		a.href = `https://kbdz.fyi/profiles?psid=${item.psid}&sid=${sid}`;
		a.textContent = item[header];
		td.appendChild(a);
	} else {
		td.textContent = item[header];
	}
        row.appendChild(td);
      });
      tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    dataGrid.appendChild(table);
  };

  const fetchServers = async (sname) => {
    try {
      const response = await fetch(`/servers?sname=${encodeURIComponent(sname)}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching servers:', error);
      return [];
    }
  };

  const fetchSurvivors = async (psname, sid) => {
    try {
      const response = await fetch(`/survivors?psname=${encodeURIComponent(psname)}&sid=${sid}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching survivors:', error);
      return [];
    }
  };

  const handleServerTypeaheadChange = async (event) => {
    const query = event.target.value.toLowerCase();
    const matchingServers = await fetchServers(query);

    if (matchingServers.length === 1) {
      selectedSid = matchingServers[0].sid;
      survivorTypeahead.disabled = false;
      renderDataGrid([matchingServers[0]], selectedSid); // Render server details
    } else {
      survivorTypeahead.disabled = true;
      renderDataGrid([]);
    }
  };

  const handleSurvivorTypeaheadChange = async (event) => {
    const query = event.target.value.toLowerCase();
    if (selectedSid) {
      const matchingSurvivors = await fetchSurvivors(query, selectedSid);
      renderDataGrid(matchingSurvivors, selectedSid); // Render survivor details
    }
  };

  serverTypeahead.addEventListener('input', handleServerTypeaheadChange);
  survivorTypeahead.addEventListener('input', handleSurvivorTypeaheadChange);
});


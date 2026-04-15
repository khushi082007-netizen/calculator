const result = document.getElementById('result');
const buttons = document.querySelector('.buttons');

buttons.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const value = btn.dataset.value;
    const action = btn.dataset.action;

    if (action === 'clear') return clearResult();
    if (action === 'delete') return deleteLast();
    if (action === 'equals') return calculate();
    if (value) return append(value);
});

function append(value) {
    // prevent multiple decimals in the current number
    if (value === '.') {
        const parts = result.value.split(/[-+/*]/);
        if (parts[parts.length - 1].includes('.')) return;
    }
    result.value += value;
}

function clearResult() { result.value = ''; }

function deleteLast() { result.value = result.value.slice(0, -1); }

function calculate() {
    try {
        const expr = result.value.replace(/×/g, '*').replace(/÷/g, '/');
        // Evaluate expression in a safer isolated function
        const value = Function('return(' + expr + ')')();
        result.value = String(value);
    } catch (err) {
        result.value = 'Error';
        setTimeout(() => (result.value = ''), 1100);
    }
}
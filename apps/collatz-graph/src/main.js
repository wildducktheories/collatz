import './style.css';
import { createGraph } from './graph.js';

const params = new URLSearchParams(window.location.search);
const a = params.has('a') ? parseInt(params.get('a'), 10) : null;
const seedNode = (a != null && Number.isInteger(a) && a > 0 && a % 2 === 1) ? a : null;

const container = document.getElementById('graph');
createGraph(container, seedNode);

const list = document.querySelector("#list")

document.addEventListener("DOMContentLoaded", _ => {
  htmx.trigger("#list", "scroll")
})

const container = document.querySelector(".container")
const visibleNodesContainer = document.querySelector(".visible-nodes-container")

let itemCount = 1_000_000
let rowHeight = 20

const totalContentHeight = itemCount * rowHeight;
container.style.height = `${totalContentHeight}px`

let startNode = Math.floor(list.scrollTop / rowHeight);
startNode = Math.max(0, startNode)

let offsetY = startNode * rowHeight;

let visibleNodesCount = Math.ceil(list.clientHeight / rowHeight);
visibleNodesCount = Math.min(itemCount - startNode, visibleNodesCount);
// visibleNodesCount = Math.min(itemCount, visibleNodesCount);

console.log({ itemCount, totalContentHeight, visibleNodesCount })

let endNode = startNode + visibleNodesCount;


list.addEventListener("htmx:configRequest", evt => {
  startNode = Math.floor(list.scrollTop / rowHeight)
  startNode = Math.max(0, startNode);

  endNode = startNode + visibleNodesCount;
  endNode = Math.min(itemCount, endNode)

  offsetY = startNode * rowHeight;

  visibleNodesContainer.style.transform = `translateY(${offsetY}px)`

  evt.detail.parameters['startNode'] = startNode
  evt.detail.parameters['endNode'] = endNode
})


const nodesList = document.querySelector(".nodes-list")
const nodesListWrapper = document.querySelector(".nodes-list-wrapper")
const visibleNodesListWrapper = document.querySelector(".visible-nodes-list-wrapper")
const ul = document.querySelector("ul")

document.addEventListener("DOMContentLoaded", _ => {
  htmx.trigger(".nodes-list", "scroll")
})

// todo large numbers
let itemCount = 100_000
let rowHeight = 41

const viewportHeight = nodesList.clientHeight

let scrollTop = nodesList.scrollTop
let visibleNodesCount = getVisibleNodesCount({rowHeight, viewportHeight})
let startNode = getStartNode(scrollTop)
let endNode = getEndNode(startNode, visibleNodesCount, itemCount)

setNodesListWrapperHeight({ itemCount, rowHeight })
setOffsetYToVisibleNodesContainer({ startNode, rowHeight })

nodesList.addEventListener("htmx:configRequest", evt => {
  scrollTop = nodesList.scrollTop
  startNode = getStartNode(scrollTop)
  endNode = getEndNode(startNode, visibleNodesCount, itemCount)
  setParameters(evt, { startNode, endNode })
})

nodesList.addEventListener("htmx:beforeSwap", _ => {
  setOffsetYToVisibleNodesContainer({ startNode, rowHeight })
})

function setNodesListWrapperHeight ({ itemCount, rowHeight }) {
  nodesListWrapper.style.height = `${itemCount * rowHeight}px`
}

function getVisibleNodesCount ({ rowHeight, viewportHeight}) {
  return Math.ceil(viewportHeight / rowHeight)
}

function setOffsetYToVisibleNodesContainer ({ startNode, rowHeight }) {
  let offsetY = startNode * rowHeight;
  visibleNodesListWrapper.style.transform = `translateY(${offsetY}px)`
}

function getStartNode (scrollTop) {
  let startNode = Math.floor(scrollTop / rowHeight) - 1
  startNode = Math.max(0, startNode)
  return startNode
}

function getEndNode (startNode, visibleNodesCount, itemCount) {
  let endNode = startNode + visibleNodesCount + 2;
  endNode = Math.min(itemCount, endNode)
  return endNode
}

function setParameters (evt, { startNode, endNode }) {
  evt.detail.parameters.startNode = startNode
  evt.detail.parameters.endNode = endNode
}

function calculateMinCost(arr) {
  // Initialize min-heap with all the ropes
  let minHeap = new MinHeap(arr);

  // Initialize total cost
  let totalCost = 0;

  // Keep merging ropes until we have only one left
  while (minHeap.size() > 1) {
    // Remove the two shortest ropes from the heap
    let first = minHeap.extractMin();
    let second = minHeap.extractMin();

    // Merge the two ropes into a single rope
    let merged = first + second;

    // Add the cost of merging to the total cost
    totalCost += merged;

    // Insert the merged rope back into the heap
    minHeap.insert(merged);
  }

  // Return the total cost of connecting all ropes
  return totalCost;
}

// Implementation of MinHeap data structure
class MinHeap {
  constructor(arr = []) {
    this.heap = arr;
    this.buildHeap();
  }

  size() {
    return this.heap.length;
  }

  buildHeap() {
    let firstParentIdx = Math.floor((this.size() - 2) / 2);
    for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
      this.siftDown(currentIdx, this.size() - 1);
    }
  }

  siftDown(currentIdx, endIdx, heap = this.heap) {
    let childOneIdx = currentIdx * 2 + 1;
    while (childOneIdx <= endIdx) {
      let childTwoIdx =
        currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
      let idxToSwap;
      if (childTwoIdx !== -1 && heap[childTwoIdx] < heap[childOneIdx]) {
        idxToSwap = childTwoIdx;
      } else {
        idxToSwap = childOneIdx;
      }

      if (heap[idxToSwap] < heap[currentIdx]) {
        this.swap(currentIdx, idxToSwap, heap);
        currentIdx = idxToSwap;
        childOneIdx = currentIdx * 2 + 1;
      } else {
        return;
      }
    }
  }

  siftUp(currentIdx, heap = this.heap) {
    let parentIdx = Math.floor((currentIdx - 1) / 2);
    while (currentIdx > 0 && heap[currentIdx] < heap[parentIdx]) {
      this.swap(currentIdx, parentIdx, heap);
      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
    }
  }

  peek() {
    return this.heap[0];
  }

  extractMin() {
    this.swap(0, this.size() - 1, this.heap);
    let min = this.heap.pop();
    this.siftDown(0, this.size() - 1, this.heap);
    return min;
  }

  insert(value) {
    this.heap.push(value);
    this.siftUp(this.size() - 1, this.heap);
  }

  swap(i, j, heap = this.heap) {
    [heap[i], heap[j]] = [heap[j], heap[i]];
  }
}

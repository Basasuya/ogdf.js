export function createWorker(f) {
    const blob = new Blob(['(' + f.toString() + ')()'])
    const url = window.URL.createObjectURL(blob)
    const worker = new Worker(url)
    return worker
}

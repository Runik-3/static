const macLink = document.getElementById('macos')
const linuxLink = document.getElementById('linux')
const windowsLink = document.getElementById('windows')
const version = document.getElementById('version')

const RELEASES_ENDPOINT = "https://api.github.com/repos/Runik-3/core/releases"

/** Fetches and sets the download artefact links for the latest runik version */
async function applyGithubArtefactLinks() {
  const res = await fetch(RELEASES_ENDPOINT)
  const releases = await res.json()
  const latest = releases[0]

  const { mac, linux, windows } = getOsLinksFromRelease(latest)

  // set links
  macLink.setAttribute("href", mac)
  linuxLink.setAttribute("href", linux)
  windowsLink.setAttribute("href", windows)

  //set version
  version.innerText = getVersionFromRelease(latest)
}
applyGithubArtefactLinks()

function getOsLinksFromRelease(release) {
  const mac = release?.assets?.filter(asset => asset?.['name'] === "runik_mac_universal.zip")?.[0]?.['browser_download_url']
  const linux = release?.assets?.filter(asset => asset?.['name'] === "Runik_Linux")?.[0]?.['browser_download_url']
  const windows = release?.assets?.filter(asset => asset?.['name'] === "Runik.Core-amd64-installer.exe")?.[0]?.['browser_download_url']

  return {
    mac,
    linux,
    windows
  }
}

function getVersionFromRelease(release) {
  return release.name
}

# M&F Web Studio — CSC 216 Lab 2

A responsive multi-page team website built with plain HTML, CSS and JavaScript.

## Pages
- `index.html` — team introduction and profile cards
- `projects.html` — project cards generated from JavaScript data, category filters and live search
- `contact.html` — accessible contact form with client-side validation
- `faq.html` — frequently asked questions using native `<details>` and `<summary>`

## Team
| Name | Registration no. | GitHub username |
|---|---|---|
| Moses Oketch | COM/3501/26 | Moses459 |
| Fred Karani | COM/7032/26 | karanifred553-ops |

## Driver allocation
The lab handout says Partner A is the partner whose first name comes first alphabetically. Using that rule, Fred Karani is Partner A and Moses Oketch is Partner B.

- **Partner A — Fred Karani:** Part 0, Part 2 and Part 4 (setup, projects/contact HTML pages, JavaScript).
- **Partner B — Moses Oketch:** Part 1 and Part 3 (home-page HTML and shared CSS).
- **Parts 5–6:** Both partners personalise, test and prepare the site for deployment.

Please confirm this matches the work you actually did together before submitting.

## Personalisation
- Team name: M&F Web Studio
- Team photos: Moses Oketch and Fred Karani
- Colours: deep teal (`#075e54`) and dark teal (`#06473f`); dark theme uses mint (`#76d8c5`)
- Added projects: Git collaboration workflow; GitHub Pages deployment
- New project category: Git & GitHub
- Extension challenges implemented: E1 (FAQ page with expandable questions), E2 (follow system theme when no preference is saved), E3 (live project search), E6 (real profile photos)

## Reflection

### 1. The menu toggle is a `<button>`, not a clickable `<div>`. Name two things you would lose with a `<div>`, and who would be affected.
A button already supports keyboard use, so a visitor can reach it with Tab and activate it with Enter or Space. A normal div does not provide that behaviour or the button meaning to assistive technology unless we add extra code. Keyboard users and people using screen readers would be affected.

### 2. What would break if you removed `defer` from the `<script>` tag in `<head>`? Explain why, in terms of how the browser parses HTML.
Without `defer`, the browser can stop parsing the HTML while it downloads and runs the script in the head. The JavaScript might run before elements such as the menu, project list or form have been created, so selectors could return `null` and the event listeners would not be attached. `defer` lets the browser finish parsing the page before running the script.

### 3. `renderProjects` uses `textContent` rather than `innerHTML`. What could go wrong with `innerHTML` if project titles were typed in by visitors?
If a visitor entered HTML or JavaScript as a project title, `innerHTML` could interpret it as real page markup instead of ordinary text. That could allow unwanted scripts or harmful content to run in another visitor’s browser. `textContent` displays the title as text, which is safer for user-provided content.

### 4. Your form checks its input with JavaScript. Why will the server still need to validate the same data once the form is connected to one?
Browser-side checks can be bypassed because a visitor can turn off JavaScript or send a request without using the form. The server must check the name, email and message again before accepting or storing them. This protects the application and its data instead of trusting the visitor’s browser.

### 5. Your theme choice follows you from Home to Contact, but not from a double-clicked file to Live Server. Explain this using the idea of an origin.
The browser stores `localStorage` separately for each origin. Opening a page directly uses a `file://` address, while Live Server uses an `http://` address with a host and port, so they are different origins and do not share the same saved theme. The pages share the theme when they are all opened through the same Live Server address.

### 6. Name something duplicated across your HTML pages. What problem does that duplication cause, and how might it be avoided?
The site header and navigation are repeated on the Home, Projects, Contact and FAQ pages. If we change a link or the team name, we have to remember to update every copy, and one page could be left inconsistent. A larger site could avoid this with reusable components, templates or shared includes; for this plain HTML lab, we need to keep the copies consistent.

## Before submission
1. Fill in both registration numbers and GitHub usernames.
2. Confirm the driver allocation and make sure the reflection answers represent what both partners understand.
3. Check every page with the W3C validator, keyboard navigation, a 375px viewport and Lighthouse.
4. Commit and push the project to the shared GitHub repository.
5. Enable GitHub Pages from `Settings → Pages`, branch `main`, folder `/ (root)`.

## Run locally
Open the folder in VS Code and use the Live Server extension, or open `index.html` in a browser for a quick preview. Live Server is recommended so local storage works consistently across pages.

## Important note
The contact form validates input in the browser only. It does not send or store messages because no backend service is connected.

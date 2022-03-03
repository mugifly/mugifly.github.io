# mugifly.github.io

A personal blog about software development built with [Scully](https://scully.io/) + [esa.io](https://esa.io/).

https://mugifly.github.io/

## Custom plugins for Scully

## [lunr](https://github.com/mugifly/mugifly.github.io/blob/master/scully/plugins/lunr/plugin.ts)

Full-text search with [Lunr.js](https://github.com/olivernn/lunr.js/) on Scully.

## Custom plugins for Scully with esa.io

I made custom plugins for Scully to fix some problems between Scully + esa.io.

## [esa-post-process](https://github.com/mugifly/mugifly.github.io/blob/master/scully/plugins/esa-post-process/plugin.ts)

In the esa.io code block, you can use markdown syntax to attach filenames (e.g., `foo.html`, `src/foo.js`).
On the other hand, the Scully syntax highlighting and markdown parser can only recognize its extension (e.g., `html`, `js`), which prevents highlighting from working properly.

This plugin fixes the codeblocks to correctly recognized by syntax highlighter.
In addition, It appends a filename label at the top left of the code block.

## [esa-route-process](https://github.com/mugifly/mugifly.github.io/blob/master/scully/plugins/esa-route-process/plugin.ts)

esa.io's GitHub integration makes it easy to push articles to our GitHub repository.
However, the pushed filenames will be strange characters, such as `10.html.md`.

Therefore, Scully occurs the problem of creating static HTML with strange names, such as `10.html.html`.

This plugin fixes this problem.

## Author

Masanori Ohgita ([mugifly](https://github.com/mugifly)).

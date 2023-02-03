import { __awaiter } from "tslib";
import { registerPlugin } from '@scullyio/scully';
// @ts-ignore
import { JSDOM } from 'jsdom';
const Plugin = (dom, route) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!dom)
        return new JSDOM();
    // Find codeblocks recognized by code syntax highlighter
    let codeblocks = dom.window.document.querySelectorAll('code[class^="language-"]');
    for (let i = 0; i < codeblocks.length; i++) {
        let codeblockFileName = null;
        let codeblockFileExtension = null;
        // Find invalid class names
        // (If the class name contains the filename or path not just extension, it will not be recognized correctly by code syntax highlighter.)
        // @ts-ignore
        const targetClassName = Array.from(codeblocks[i].classList).find((className) => {
            if (className.match(/^language-(.+\.(.+))$/)) {
                codeblockFileName = RegExp.$1;
                codeblockFileExtension = RegExp.$2;
                return true;
            }
            return false;
        });
        if (!codeblockFileName || !codeblockFileExtension || !targetClassName)
            continue;
        // Fix the class name
        const validClassName = `language-${codeblockFileExtension}`;
        codeblocks[i].classList.replace(targetClassName, validClassName);
        // Append the filename as a new element
        const filenameLabel = dom.window.document.createElement('span');
        filenameLabel.innerHTML = codeblockFileName;
        filenameLabel.style.background = '#ffffffaa';
        filenameLabel.style.fontSize = '0.6rem';
        filenameLabel.style.padding = '0.2rem 1rem 0.2rem 1rem';
        const filenameLabelContainer = dom.window.document.createElement('div');
        filenameLabelContainer.appendChild(filenameLabel);
        filenameLabelContainer.className = 'esa-codeblock-filename';
        filenameLabelContainer.style.position = 'absolute';
        filenameLabelContainer.style.left = '0px';
        filenameLabelContainer.style.top = '0px';
        filenameLabelContainer.style.lineHeight = '1rem';
        const filenameLabelSpacer = dom.window.document.createElement('div');
        filenameLabelSpacer.style.fontSize = '0.5rem';
        filenameLabelSpacer.innerHTML = '&#8203;'; // zero width space character
        if (codeblocks[i] && codeblocks[i].parentNode && codeblocks[i].parentNode != null) {
            (_a = codeblocks[i].parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(filenameLabelSpacer, codeblocks[i]);
            (_b = codeblocks[i].parentNode) === null || _b === void 0 ? void 0 : _b.insertBefore(filenameLabelContainer, codeblocks[i]);
        }
    }
    return dom;
});
registerPlugin('postProcessByDom', 'esaPostProcess', Plugin);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNhLXBvc3QtcHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3NjdWxseS1wbHVnaW4tZXNhL3NyYy9saWIvZXNhLXBvc3QtcHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBZ0IsTUFBTSxrQkFBa0IsQ0FBQztBQUVoRSxhQUFhO0FBQ2IsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUU5QixNQUFNLE1BQU0sR0FBRyxDQUFPLEdBQVcsRUFBRSxLQUFvQixFQUFrQixFQUFFOztJQUN6RSxJQUFJLENBQUMsR0FBRztRQUFFLE9BQU8sSUFBSSxLQUFLLEVBQUUsQ0FBQztJQUU3Qix3REFBd0Q7SUFDeEQsSUFBSSxVQUFVLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsMEJBQTBCLENBQUMsQ0FBQztJQUNsRixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUMxQyxJQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQztRQUM3QixJQUFJLHNCQUFzQixHQUFHLElBQUksQ0FBQztRQUVsQywyQkFBMkI7UUFDM0Isd0lBQXdJO1FBQ3hJLGFBQWE7UUFDYixNQUFNLGVBQWUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFpQixFQUFFLEVBQUU7WUFDckYsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLEVBQUU7Z0JBQzVDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBQzlCLHNCQUFzQixHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBQ25DLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGlCQUFpQixJQUFJLENBQUMsc0JBQXNCLElBQUksQ0FBQyxlQUFlO1lBQUUsU0FBUztRQUVoRixxQkFBcUI7UUFDckIsTUFBTSxjQUFjLEdBQUcsWUFBWSxzQkFBc0IsRUFBRSxDQUFDO1FBQzVELFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUVqRSx1Q0FBdUM7UUFDdkMsTUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hFLGFBQWEsQ0FBQyxTQUFTLEdBQUcsaUJBQWlCLENBQUM7UUFDNUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDO1FBQzdDLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN4QyxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyx5QkFBeUIsQ0FBQztRQUN4RCxNQUFNLHNCQUFzQixHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4RSxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbEQsc0JBQXNCLENBQUMsU0FBUyxHQUFHLHdCQUF3QixDQUFDO1FBQzVELHNCQUFzQixDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1FBQ25ELHNCQUFzQixDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQzFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO1FBQ3pDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO1FBQ2pELE1BQU0sbUJBQW1CLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JFLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzlDLG1CQUFtQixDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQyw2QkFBNkI7UUFDeEUsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxJQUFJLElBQUksRUFBRTtZQUNqRixNQUFBLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLDBDQUFFLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzRSxNQUFBLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLDBDQUFFLFlBQVksQ0FBQyxzQkFBc0IsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMvRTtLQUNGO0lBRUQsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDLENBQUEsQ0FBQztBQUVGLGNBQWMsQ0FBQyxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlZ2lzdGVyUGx1Z2luLCBIYW5kbGVkUm91dGUgfSBmcm9tICdAc2N1bGx5aW8vc2N1bGx5JztcblxuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IHsgSlNET00gfSBmcm9tICdqc2RvbSc7XG5cbmNvbnN0IFBsdWdpbiA9IGFzeW5jIChkb20/OiBKU0RPTSwgcm91dGU/OiBIYW5kbGVkUm91dGUpOiBQcm9taXNlPEpTRE9NPiA9PiB7XG4gIGlmICghZG9tKSByZXR1cm4gbmV3IEpTRE9NKCk7XG5cbiAgLy8gRmluZCBjb2RlYmxvY2tzIHJlY29nbml6ZWQgYnkgY29kZSBzeW50YXggaGlnaGxpZ2h0ZXJcbiAgbGV0IGNvZGVibG9ja3MgPSBkb20ud2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2NvZGVbY2xhc3NePVwibGFuZ3VhZ2UtXCJdJyk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29kZWJsb2Nrcy5sZW5ndGg7IGkrKykge1xuICAgIGxldCBjb2RlYmxvY2tGaWxlTmFtZSA9IG51bGw7XG4gICAgbGV0IGNvZGVibG9ja0ZpbGVFeHRlbnNpb24gPSBudWxsO1xuXG4gICAgLy8gRmluZCBpbnZhbGlkIGNsYXNzIG5hbWVzXG4gICAgLy8gKElmIHRoZSBjbGFzcyBuYW1lIGNvbnRhaW5zIHRoZSBmaWxlbmFtZSBvciBwYXRoIG5vdCBqdXN0IGV4dGVuc2lvbiwgaXQgd2lsbCBub3QgYmUgcmVjb2duaXplZCBjb3JyZWN0bHkgYnkgY29kZSBzeW50YXggaGlnaGxpZ2h0ZXIuKVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCB0YXJnZXRDbGFzc05hbWUgPSBBcnJheS5mcm9tKGNvZGVibG9ja3NbaV0uY2xhc3NMaXN0KS5maW5kKChjbGFzc05hbWU6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKGNsYXNzTmFtZS5tYXRjaCgvXmxhbmd1YWdlLSguK1xcLiguKykpJC8pKSB7XG4gICAgICAgIGNvZGVibG9ja0ZpbGVOYW1lID0gUmVnRXhwLiQxO1xuICAgICAgICBjb2RlYmxvY2tGaWxlRXh0ZW5zaW9uID0gUmVnRXhwLiQyO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgIGlmICghY29kZWJsb2NrRmlsZU5hbWUgfHwgIWNvZGVibG9ja0ZpbGVFeHRlbnNpb24gfHwgIXRhcmdldENsYXNzTmFtZSkgY29udGludWU7XG5cbiAgICAvLyBGaXggdGhlIGNsYXNzIG5hbWVcbiAgICBjb25zdCB2YWxpZENsYXNzTmFtZSA9IGBsYW5ndWFnZS0ke2NvZGVibG9ja0ZpbGVFeHRlbnNpb259YDtcbiAgICBjb2RlYmxvY2tzW2ldLmNsYXNzTGlzdC5yZXBsYWNlKHRhcmdldENsYXNzTmFtZSwgdmFsaWRDbGFzc05hbWUpO1xuXG4gICAgLy8gQXBwZW5kIHRoZSBmaWxlbmFtZSBhcyBhIG5ldyBlbGVtZW50XG4gICAgY29uc3QgZmlsZW5hbWVMYWJlbCA9IGRvbS53aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGZpbGVuYW1lTGFiZWwuaW5uZXJIVE1MID0gY29kZWJsb2NrRmlsZU5hbWU7XG4gICAgZmlsZW5hbWVMYWJlbC5zdHlsZS5iYWNrZ3JvdW5kID0gJyNmZmZmZmZhYSc7XG4gICAgZmlsZW5hbWVMYWJlbC5zdHlsZS5mb250U2l6ZSA9ICcwLjZyZW0nO1xuICAgIGZpbGVuYW1lTGFiZWwuc3R5bGUucGFkZGluZyA9ICcwLjJyZW0gMXJlbSAwLjJyZW0gMXJlbSc7XG4gICAgY29uc3QgZmlsZW5hbWVMYWJlbENvbnRhaW5lciA9IGRvbS53aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZmlsZW5hbWVMYWJlbENvbnRhaW5lci5hcHBlbmRDaGlsZChmaWxlbmFtZUxhYmVsKTtcbiAgICBmaWxlbmFtZUxhYmVsQ29udGFpbmVyLmNsYXNzTmFtZSA9ICdlc2EtY29kZWJsb2NrLWZpbGVuYW1lJztcbiAgICBmaWxlbmFtZUxhYmVsQ29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBmaWxlbmFtZUxhYmVsQ29udGFpbmVyLnN0eWxlLmxlZnQgPSAnMHB4JztcbiAgICBmaWxlbmFtZUxhYmVsQ29udGFpbmVyLnN0eWxlLnRvcCA9ICcwcHgnO1xuICAgIGZpbGVuYW1lTGFiZWxDb250YWluZXIuc3R5bGUubGluZUhlaWdodCA9ICcxcmVtJztcbiAgICBjb25zdCBmaWxlbmFtZUxhYmVsU3BhY2VyID0gZG9tLndpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBmaWxlbmFtZUxhYmVsU3BhY2VyLnN0eWxlLmZvbnRTaXplID0gJzAuNXJlbSc7XG4gICAgZmlsZW5hbWVMYWJlbFNwYWNlci5pbm5lckhUTUwgPSAnJiM4MjAzOyc7IC8vIHplcm8gd2lkdGggc3BhY2UgY2hhcmFjdGVyXG4gICAgaWYgKGNvZGVibG9ja3NbaV0gJiYgY29kZWJsb2Nrc1tpXS5wYXJlbnROb2RlICYmIGNvZGVibG9ja3NbaV0ucGFyZW50Tm9kZSAhPSBudWxsKSB7XG4gICAgICBjb2RlYmxvY2tzW2ldLnBhcmVudE5vZGU/Lmluc2VydEJlZm9yZShmaWxlbmFtZUxhYmVsU3BhY2VyLCBjb2RlYmxvY2tzW2ldKTtcbiAgICAgIGNvZGVibG9ja3NbaV0ucGFyZW50Tm9kZT8uaW5zZXJ0QmVmb3JlKGZpbGVuYW1lTGFiZWxDb250YWluZXIsIGNvZGVibG9ja3NbaV0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkb207XG59O1xuXG5yZWdpc3RlclBsdWdpbigncG9zdFByb2Nlc3NCeURvbScsICdlc2FQb3N0UHJvY2VzcycsIFBsdWdpbik7XG4iXX0=
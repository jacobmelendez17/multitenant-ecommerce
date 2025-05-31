import { RefObject } from "react"

export const useDropdownPosition = (
    ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>
) => {
    const getDropdownPosition = () => {
        if (!ref.current) return { top: 0, left: 0};

        const rect = ref.current.getBoundingClientRect();
        const dropdownWidth = 240; // Dropdown width (2-60 = 15 rem = 240px)

        // Calculate initial position
        let left = rect.left + window.scrollX;
        const top = rect.bottom + window.scrollY;

        // Checl of dropdownw would go off right edge of viewport
        if (left + dropdownWidth > window.innerWidth) {
            left = rect.right + window.scrollX
        }

        // If still off-screen, align to right edge of viewport with padding
        if (left < 0) {
            left = window.innerWidth - dropdownWidth - 16;
        }
        
        // Ensure dropdown doesn't go off left edge
        if (left < 0) {
            left = 16;
        }

        return { top, left };
    };

    return { getDropdownPosition };
};
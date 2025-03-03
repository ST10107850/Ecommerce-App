

export const useCapitalize = () => {
    const capitalizeFirstLetter = (string: string) => {
        if (typeof string !== "string") return string; 
    
        return string
          .split(" ") 
          .map((word) => {
            if (word.length > 0) {
              return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }
            return word;
          })
          .join(" ");
      };
  return { capitalizeFirstLetter };
};

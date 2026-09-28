import Select from 'react-select';

const StyledSelect = ({ themeMode = 'dark', ...props }) => {
    const colors = {
        dark: {
            primary25: '#4A4A4A', // hover option background
            primary: '#1F1F1F', // focus outline or selected color
            neutral0: '#1c222b', // menu background
            neutral80: '#E5E5E5', // text color
            neutral20: '#2d3643', // border color
        }
    };

    const getColors = (mode = 'dark') => colors[mode];

    const currentColors = getColors('dark');

    return (
        <Select
            {...props}
            theme={(theme) => ({
                ...theme,
                colors: {
                    ...theme.colors,
                    primary25: currentColors.primary25,
                    primary: currentColors.primary,
                    neutral0: currentColors.neutral0,
                    neutral80: currentColors.neutral80,
                    neutral20: currentColors.neutral20,
                },
            })}
            styles={{
                control: (provided) => ({
                    ...provided,
                    backgroundColor: currentColors.neutral0,
                    color: currentColors.neutral80,
                    borderColor: currentColors.neutral20,
                }),
                singleValue: (provided) => ({
                    ...provided,
                    color: currentColors.neutral80,
                }),
                placeholder: (provided) => ({
                    ...provided,
                    color: currentColors.neutral20,
                }),
                menu: (provided) => ({
                    ...provided,
                    backgroundColor: currentColors.neutral0,
                }),
                option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected
                        ? currentColors.primary
                        : state.isFocused
                            ? currentColors.primary25
                            : currentColors.neutral0,
                    color: currentColors.neutral80,
                }),
            }}
        />
    );
};

export default StyledSelect;
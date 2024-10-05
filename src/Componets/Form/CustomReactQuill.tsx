import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import React Quill styles
import "./labelColor.css"; // Ensure this CSS file is imported

type TInputProps = {
  name: string;
  label?: string;
  isLabelColor?: boolean;
  placeholder?: string;
};

const CustomReactQuill = ({
  name,
  label,
  isLabelColor,
  placeholder,
}: TInputProps) => {
  return (
    <div
      style={{ marginBottom: "10px" }}
      className={`${isLabelColor && "custom-label"}`}
    >
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <>
            {label && (
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                }}
              >
                {label}
              </label>
            )}
            <div>
              <ReactQuill
                {...field}
                onChange={(content: any) => field.onChange(content)} // Handle change via field's onChange
                value={field.value || ""} // Ensure value is managed properly
                placeholder={placeholder}
                className="h-56 mb-10"
                theme="snow" // React Quill theme (can be customized)
              />
              {error && <small style={{ color: "red" }}>{error.message}</small>}
            </div>
          </>
        )}
      />
    </div>
  );
};

export default CustomReactQuill;

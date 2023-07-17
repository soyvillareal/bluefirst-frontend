import {
  Box,
  FormHelperText,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Controller, useController, useFormContext } from "react-hook-form";
import FileUploadIcon from "@mui/icons-material/FileUpload";

// 👇 FileUpload Props Here
interface IFileUploadProps {
  name: string;
}

// 👇 FileUpload Component
const FileUpload: React.FC<IFileUploadProps> = ({ name }) => {
  // 👇 Form Context
  const {
    control,
    formState: { isSubmitting, errors },
  } = useFormContext();

  // 👇 State with useState()
  const { field } = useController({ name, control });
  const [singleFile, setSingleFile] = useState<File[]>([]);
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 👇 Toggle the dragover class
  const onDragEnter = () => wrapperRef.current?.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current?.classList.remove("dragover");

  // 👇 Image Upload Service
  const onFileDrop = useCallback(
    (e: React.SyntheticEvent<EventTarget>) => {
      const target = e.target as HTMLInputElement;
      if (!target.files) return;
      const newFile = Object.values(target.files).map((file: File) => file);

      const reader = new FileReader();
      reader.readAsDataURL(newFile[0]);
      reader.onloadend = function (e) {
        console.log('entraaaaaaaaaaaaaaaaaaaaaaaaa')
        reader.result && setPreviewImage(reader.result as string);
      };

      setSingleFile(newFile);
      field.onChange(newFile[0]);
    },
    [field]
  );

  // 👇 remove single image
  const fileSingleRemove = () => {
    setSingleFile([]);
  };

  // 👇 Reset the State
  useEffect(() => {
    if (isSubmitting && !errors) {
      setSingleFile([]);
    }
  }, [isSubmitting, errors]);

  return (
    <>
      <Stack
        sx={{
          width: 160,
          height: 160,
          borderRadius: "50%",
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            position: "relative",
            width: "100%",
            height: "13rem",
            border: "2px dashed #4267b2",
            backgroundColor: "grey.900",
            borderRadius: "50%",
            "&:hover": {
              cursor: singleFile.length > 0 ? "no-drop" : "pointer",
              opacity: singleFile.length > 0 ? 1 : 0.5,
            },
          }}
          ref={wrapperRef}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDragLeave}
        >
          <Stack justifyContent="center" sx={{ p: 1, textAlign: "center" }}>
            {singleFile.length > 0 && previewImage ? (
              <Stack
                sx={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <Box
                  component="img"
                  src={previewImage}
                  sx={{
                    width: 160,
                    height: 160,
                    objectFit: "cover",
                    borderRadius: "50%",
                    opacity: 0.5,
                  }}
                />
                <IconButton
                  onClick={() => fileSingleRemove()}
                  sx={{
                    color: "error.main",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1,
                    "&:hover": {
                      opacity: 0.5,
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            ) : (
              <>
                <Box>
                  <FileUploadIcon
                    sx={{
                      color: "primary.dark",
                    }}
                  />
                </Box>
                <Typography variant="body1" component="span">
                  <Typography variant="subtitle1">Supported Files</Typography>
                </Typography>
                <Typography variant="body2" component="span">
                  JPG, JPEG, PNG
                </Typography>
              </>
            )}
          </Stack>
          <Controller
            name={name}
            defaultValue=""
            control={control}
            render={({ field: { name, onBlur, ref } }) => (
              <input
                type="file"
                name={name}
                onBlur={onBlur}
                ref={ref}
                onChange={onFileDrop}
                accept="image/jpg, image/png, image/jpeg"
                disabled={singleFile.length > 0}
                style={{
                  opacity: 0,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  cursor: singleFile.length > 0 ? "no-drop" : "pointer",
                }}
              />
            )}
          />
        </Box>
      </Stack>

      <FormHelperText
        sx={{ textAlign: "center", my: 1 }}
        error={!!errors[name]}
      >
        {errors[name] ? (errors[name]?.message as unknown as string) : ""}
      </FormHelperText>
    </>
  );
};

export default FileUpload;

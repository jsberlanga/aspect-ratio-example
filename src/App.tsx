import * as React from "react";
import styled, { css } from "styled-components";

type StyledImageWrapperProps =
  | {
      width?: never;
      height?: never;
      layout: "fill";
    }
  | {
      width: number | string;
      height: number | string;
      layout: "intrinsic";
    };

type ImageProps = StyledImageWrapperProps &
  React.ImgHTMLAttributes<HTMLImageElement>;

const StyledImageWrapper = styled.div<StyledImageWrapperProps>`
  --width: ${({ width }) => width};
  --height: ${({ height }) => height};

  ${({ layout }) => {
    if (layout === "fill") {
      return css`
        display: block;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        box-sizing: border-box;
        margin: 0;

        & > * {
          object-fit: cover;
        }
      `;
    }

    if (layout === "intrinsic") {
      return css`
        display: block;
        overflow: hidden;
        position: relative;
        box-sizing: border-box;
        margin: 0;
        padding-top: calc(100% / (var(--width) / var(--height)));
      `;
    }
  }};
`;

const StyledImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  box-sizing: border-box;
  padding: 0;
  border: none;
  margin: auto;
  display: block;
  width: 0;
  height: 0;
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
  max-height: 100%;
`;

const Image = ({ layout, ...imageProps }: ImageProps) => {
  let wrapperProps = { layout } as ImageProps;

  if (layout === "intrinsic") {
    wrapperProps.width = imageProps.width;
    wrapperProps.height = imageProps.height;
  }

  return (
    <StyledImageWrapper {...wrapperProps}>
      <StyledImage {...imageProps} />
    </StyledImageWrapper>
  );
};

interface AspectRatioProps {
  ratio?: string | number;
  maxWidth?: string | number;
}

const AspectRatio = styled.div<AspectRatioProps>`
  --aspect-ratio: ${({ ratio = 1 }) => ratio};
  --max-width: ${({ maxWidth = "100%" }) =>
    typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth};

  display: block;
  position: relative;
  box-sizing: border-box;
  max-width: var(--max-width);

  &:before {
    display: block;
    content: "";
    width: 100%;
    aspect-ratio: var(--aspect-ratio);

    @supports not (aspect-ratio: 1/1) {
      height: 0;
      padding-bottom: calc(100% / (var(--aspect-ratio)));
    }
  }

  & > * {
    position: absolute;
    overflow: hidden;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
`;

function App() {
  return (
    <main>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
        }}
      >
        <AspectRatio ratio="16/9" maxWidth={200}>
          <Image src="https://source.unsplash.com/random" layout="fill" />
        </AspectRatio>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, eum ab
          recusandae repudiandae sunt, similique iste provident eius voluptatem
          hic quasi, sapiente quaerat impedit veritatis. Voluptatem porro
          deserunt cum obcaecati accusantium repudiandae nesciunt, inventore
          animi nihil optio aut dolorem! Amet!
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
        }}
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, eum ab
          recusandae repudiandae sunt, similique iste provident eius voluptatem
          hic quasi, sapiente quaerat impedit veritatis. Voluptatem porro
          deserunt cum obcaecati accusantium repudiandae nesciunt, inventore
          animi nihil optio aut dolorem! Amet!
        </p>
        <Image
          src="https://source.unsplash.com/random"
          layout="intrinsic"
          width="500"
          height="400"
        />
      </div>
      <br />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
        }}
      >
        <AspectRatio ratio={4 / 3}>
          <video autoPlay loop playsInline>
            <source
              src="//videos.ctfassets.net/hjjyw06csfy9/34YgiWto6SVwS4GxfUzPNz/9d6cf5fcb241e6df7fc031de5bce7cf6/Animation_5.mp4"
              type="video/mp4"
            />
          </video>
        </AspectRatio>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, eum ab
          recusandae repudiandae sunt, similique iste provident eius voluptatem
          hic quasi, sapiente quaerat impedit veritatis. Voluptatem porro
          deserunt cum obcaecati accusantium repudiandae nesciunt, inventore
          animi nihil optio aut dolorem! Amet!
        </p>
      </div>
    </main>
  );
}

export default App;

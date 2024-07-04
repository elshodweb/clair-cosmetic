import React, { FC } from "react";
import styles from "./Like.module.scss";
import cn from "classnames";

interface LikeProps {
  isLiked: boolean;
}

const Like: FC<LikeProps> = ({ isLiked }) => {
  return <div className={cn(styles.like, isLiked ? styles.liked : "")}></div>;
};

export default Like;
